import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  Polygon, 
  Marker, 
  Popup, 
  Tooltip, 
  useMap, 
  useMapEvents 
} from 'react-leaflet';
import L from 'leaflet';
import { 
  Search, 
  Layers, 
  Filter, 
  Maximize2, 
  Compass, 
  Ruler, 
  Eye, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw,
  Sparkles,
  MapPin,
  ChevronDown,
  Info
} from 'lucide-react';
import { useLandStack } from '../context/LandStackContext';
import { MapParcelModal } from './MapParcelModal';
import { formatArea, getRiskBadgeColor, getLandUseBadge } from '../utils/formatters';

// Fix default Leaflet icon paths in Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom component to programmatically pan/zoom map
function MapController({ center, zoom, bounds }) {
  const map = useMap();
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 17 });
    } else if (center) {
      map.flyTo(center, zoom || 15, { duration: 1.2 });
    }
  }, [center, zoom, bounds, map]);
  return null;
}

// Measurement Tool Handler
function MapMeasureHandler({ isMeasuring, onPointAdded }) {
  useMapEvents({
    click(e) {
      if (isMeasuring) {
        onPointAdded([e.latlng.lat, e.latlng.lng]);
      }
    }
  });
  return null;
}

export const MapView = () => {
  const { 
    parcels, 
    selectedParcel, 
    setSelectedParcel, 
    selectParcel,
    filters,
    setFilters
  } = useLandStack();

  const [activeParcel, setActiveParcel] = useState(selectedParcel || null);
  const [mapCenter, setMapCenter] = useState([18.5912, 73.7389]); // Default to Pune
  const [mapZoom, setMapZoom] = useState(13);
  const [mapBounds, setMapBounds] = useState(null);

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedLandUse, setSelectedLandUse] = useState('All');
  const [selectedRiskFilter, setSelectedRiskFilter] = useState('All');

  // Map Basemap Tile Layer
  const [baseTile, setBaseTile] = useState('cartoDark'); // 'osm' | 'cartoDark' | 'satellite'
  const [showZoningLayer, setShowZoningLayer] = useState(true);
  const [layerOpacity, setLayerOpacity] = useState(0.55);

  // Measurement Tool State
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [measurePoints, setMeasurePoints] = useState([]);

  // Available States and cascading Districts from parcels dataset
  const states = useMemo(() => {
    const s = new Set(parcels.map(p => p.location.state));
    return Array.from(s);
  }, [parcels]);

  const districts = useMemo(() => {
    if (!selectedState) {
      const d = new Set(parcels.map(p => p.location.district));
      return Array.from(d);
    }
    const d = new Set(parcels.filter(p => p.location.state === selectedState).map(p => p.location.district));
    return Array.from(d);
  }, [parcels, selectedState]);

  // Filtered Parcels
  const filteredParcels = useMemo(() => {
    return parcels.filter(p => {
      // Search term query
      if (searchTerm) {
        const q = searchTerm.toLowerCase().trim();
        const matches = 
          p.ulpin.toLowerCase().includes(q) ||
          p.bhuAadhaar.toLowerCase().includes(q) ||
          p.surveyNo.toLowerCase().includes(q) ||
          p.location.village.toLowerCase().includes(q) ||
          p.location.district.toLowerCase().includes(q) ||
          p.revenueRecords?.owners?.some(o => o.name.toLowerCase().includes(q));
        if (!matches) return false;
      }

      // State
      if (selectedState && p.location.state !== selectedState) return false;

      // District
      if (selectedDistrict && p.location.district !== selectedDistrict) return false;

      // Land Use
      if (selectedLandUse !== 'All' && p.landUseCategory !== selectedLandUse) return false;

      // Risk Filter
      if (selectedRiskFilter === 'Clear' && p.litigation?.hasLitigation) return false;
      if (selectedRiskFilter === 'Stayed' && !p.litigation?.hasLitigation) return false;

      return true;
    });
  }, [parcels, searchTerm, selectedState, selectedDistrict, selectedLandUse, selectedRiskFilter]);

  // When selectedParcel changes from outside (e.g. from Hero), focus map on it
  useEffect(() => {
    if (selectedParcel) {
      setActiveParcel(selectedParcel);
      if (selectedParcel.location?.center) {
        setMapCenter(selectedParcel.location.center);
        setMapZoom(16);
      }
    }
  }, [selectedParcel]);

  // Handle parcel click on map
  const handleParcelClick = (parcel) => {
    setActiveParcel(parcel);
    setSelectedParcel(parcel);
    if (parcel.location?.center) {
      setMapCenter(parcel.location.center);
    }
  };

  // Convert GeoJSON coordinates [[lng, lat]] to Leaflet [[lat, lng]]
  const getLeafletCoords = (geometry) => {
    if (!geometry || !geometry.coordinates || !geometry.coordinates[0]) return [];
    return geometry.coordinates[0].map(([lng, lat]) => [lat, lng]);
  };

  // Reset to all parcels extent
  const handleZoomToAll = () => {
    if (filteredParcels.length === 0) return;
    const allCoords = [];
    filteredParcels.forEach(p => {
      const coords = getLeafletCoords(p.geometry);
      coords.forEach(c => allCoords.push(c));
    });
    if (allCoords.length > 0) {
      const bounds = L.latLngBounds(allCoords);
      setMapBounds(bounds);
    }
  };

  // Measurement Point Added
  const handlePointAdded = (point) => {
    setMeasurePoints(prev => [...prev, point]);
  };

  // Calculate measured area if > 2 points
  const calculatedMeasureArea = useMemo(() => {
    if (measurePoints.length < 3) return null;
    try {
      const latlngs = measurePoints.map(p => L.latLng(p[0], p[1]));
      const areaM2 = L.GeometryUtil ? L.GeometryUtil.geodesicArea(latlngs) : 0;
      return {
        sqm: Math.round(areaM2),
        acres: (areaM2 * 0.000247105).toFixed(3)
      };
    } catch {
      return null;
    }
  }, [measurePoints]);

  const tileUrls = {
    cartoDark: {
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap contributors'
    },
    osm: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; OpenStreetMap contributors'
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] flex flex-col bg-slate-950 overflow-hidden">
      
      {/* Top Filter & GIS Navigation Bar */}
      <div className="bg-slate-900 border-b border-slate-800 p-3 z-20 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Search Box */}
          <div className="relative flex-1 min-w-[240px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search ULPIN, Survey No, Owner, Village..."
              className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Cascading Location Selectors */}
          <div className="flex flex-wrap items-center gap-2">
            {/* State */}
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedDistrict('');
                const firstMatching = parcels.find(p => p.location.state === e.target.value);
                if (firstMatching) {
                  setMapCenter(firstMatching.location.center);
                  setMapZoom(12);
                }
              }}
              className="px-2.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="">All States ({states.length})</option>
              {states.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            {/* District */}
            <select
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                const firstMatching = parcels.find(p => p.location.district === e.target.value);
                if (firstMatching) {
                  setMapCenter(firstMatching.location.center);
                  setMapZoom(14);
                }
              }}
              className="px-2.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="">All Districts ({districts.length})</option>
              {districts.map(d => <option key={d} value={d}>{d}</option>)}
            </select>

            {/* Land Use Filter */}
            <select
              value={selectedLandUse}
              onChange={(e) => setSelectedLandUse(e.target.value)}
              className="px-2.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="All">All Land Uses</option>
              <option value="Agricultural">Agricultural</option>
              <option value="Commercial">Commercial</option>
              <option value="Residential">Residential</option>
              <option value="Industrial">Industrial</option>
              <option value="Institutional">Institutional</option>
              <option value="Protected / Government">Protected / Govt</option>
            </select>

            {/* Title / Risk Filter */}
            <select
              value={selectedRiskFilter}
              onChange={(e) => setSelectedRiskFilter(e.target.value)}
              className="px-2.5 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="All">All Title Statuses</option>
              <option value="Clear">Clear Title Only</option>
              <option value="Stayed">Court Stay / Flagged</option>
            </select>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center space-x-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] font-mono">
            <span className="text-slate-400">Visible Cadastre:</span>
            <span className="text-emerald-400 font-bold">{filteredParcels.length} Parcels</span>
          </div>

        </div>
      </div>

      {/* Main Map Container */}
      <div className="relative flex-1 w-full h-full">
        
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          scrollWheelZoom={true}
          className="w-full h-full z-10"
        >
          <MapController center={mapCenter} zoom={mapZoom} bounds={mapBounds} />
          <MapMeasureHandler isMeasuring={isMeasuring} onPointAdded={handlePointAdded} />

          {/* Base Tile Layer */}
          <TileLayer
            attribution={tileUrls[baseTile].attribution}
            url={tileUrls[baseTile].url}
          />

          {/* Render GeoJSON Cadastral Parcels */}
          {filteredParcels.map((parcel) => {
            const coords = getLeafletCoords(parcel.geometry);
            const isSelected = activeParcel?.ulpin === parcel.ulpin;
            const landUseBadge = getLandUseBadge(parcel.landUseCategory);
            const isStayed = parcel.litigation?.hasLitigation;

            return (
              <React.Fragment key={parcel.ulpin}>
                {/* Polygon Boundary */}
                <Polygon
                  positions={coords}
                  pathOptions={{
                    color: isSelected ? '#10B981' : isStayed ? '#DC2626' : parcel.colorCode || '#2563EB',
                    fillColor: isStayed ? '#DC2626' : parcel.colorCode || '#2563EB',
                    fillOpacity: isSelected ? 0.75 : layerOpacity,
                    weight: isSelected ? 4 : 2,
                    dashArray: isStayed ? '5, 5' : null
                  }}
                  eventHandlers={{
                    click: () => handleParcelClick(parcel)
                  }}
                >
                  <Tooltip sticky direction="top" className="custom-map-tooltip">
                    <div className="text-xs font-sans p-1">
                      <div className="font-bold text-slate-900 flex items-center gap-1 font-mono">
                        <span>{parcel.ulpin}</span>
                        {isStayed && <span className="text-red-600 font-bold">[STAY]</span>}
                      </div>
                      <div className="text-[11px] text-slate-700">
                        Survey: {parcel.surveyNo} • {parcel.landUseCategory}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Area: {parcel.spatialAttributes?.areaAcres} Acres ({parcel.location.village})
                      </div>
                    </div>
                  </Tooltip>
                </Polygon>

                {/* Center Marker */}
                {parcel.location?.center && (
                  <Marker
                    position={parcel.location.center}
                    eventHandlers={{
                      click: () => handleParcelClick(parcel)
                    }}
                  >
                    <Popup className="custom-map-popup">
                      <div className="text-xs p-1">
                        <div className="font-bold text-slate-900 font-mono">{parcel.ulpin}</div>
                        <div className="text-[11px] text-slate-700">{parcel.revenueRecords?.owners?.[0]?.name}</div>
                        <button
                          onClick={() => handleParcelClick(parcel)}
                          className="mt-2 w-full py-1 bg-emerald-600 text-white rounded text-[11px] font-bold"
                        >
                          View Quick Card
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                )}
              </React.Fragment>
            );
          })}

          {/* Render Active Measurement Polygon */}
          {measurePoints.length > 0 && (
            <Polygon
              positions={measurePoints}
              pathOptions={{
                color: '#EC4899',
                fillColor: '#EC4899',
                fillOpacity: 0.3,
                weight: 2,
                dashArray: '4, 4'
              }}
            />
          )}
        </MapContainer>

        {/* Floating Map Controls (Top Right) */}
        <div className="absolute top-4 right-4 z-[999] flex flex-col space-y-2">
          
          {/* Tile Layer Switcher */}
          <div className="bg-slate-900/90 backdrop-blur border border-slate-700 rounded-xl p-1.5 shadow-xl flex flex-col space-y-1 text-xs">
            <span className="text-[10px] font-bold text-slate-400 px-2 py-0.5 uppercase tracking-wider">
              Basemap
            </span>
            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={() => setBaseTile('cartoDark')}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                  baseTile === 'cartoDark' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                Standard
              </button>
              <button
                onClick={() => setBaseTile('satellite')}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                  baseTile === 'satellite' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                Satellite
              </button>
              <button
                onClick={() => setBaseTile('osm')}
                className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                  baseTile === 'osm' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                OSM
              </button>
            </div>
          </div>

          {/* Quick Action Tools */}
          <div className="bg-slate-900/90 backdrop-blur border border-slate-700 rounded-xl p-1.5 shadow-xl flex flex-col space-y-1">
            <button
              onClick={handleZoomToAll}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white flex items-center space-x-2 text-xs transition-colors"
              title="Zoom to Extent of all Visible Parcels"
            >
              <Maximize2 className="w-4 h-4 text-emerald-400" />
              <span>Zoom to Fit All</span>
            </button>

            <button
              onClick={() => {
                setIsMeasuring(!isMeasuring);
                setMeasurePoints([]);
              }}
              className={`p-2 rounded-lg flex items-center space-x-2 text-xs transition-colors ${
                isMeasuring 
                  ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white'
              }`}
              title="Click on map vertices to calculate custom area"
            >
              <Ruler className="w-4 h-4 text-pink-400" />
              <span>{isMeasuring ? 'Exit Measure' : 'Measure Area'}</span>
            </button>
          </div>

          {/* Opacity Slider */}
          <div className="bg-slate-900/90 backdrop-blur border border-slate-700 rounded-xl p-2.5 shadow-xl text-xs text-slate-300">
            <div className="flex justify-between items-center mb-1 text-[11px]">
              <span className="text-slate-400">Cadastre Opacity:</span>
              <span className="font-mono font-bold text-emerald-400">{Math.round(layerOpacity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={layerOpacity}
              onChange={(e) => setLayerOpacity(parseFloat(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
            />
          </div>
        </div>

        {/* Measurement Info Floating Box (if active) */}
        {isMeasuring && (
          <div className="absolute top-4 left-4 z-[999] bg-slate-900/95 border border-pink-500/50 rounded-xl p-3 shadow-2xl text-xs text-slate-200 max-w-xs">
            <div className="flex items-center space-x-2 text-pink-400 font-bold mb-1">
              <Ruler className="w-4 h-4" />
              <span>DGPS Area Measure Mode</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Click 3 or more points on the GIS map to define a custom polygon boundary.
            </p>
            {measurePoints.length > 0 && (
              <div className="mt-2 pt-2 border-t border-slate-800 space-y-1">
                <div className="text-[11px]">Points Placed: <strong className="text-white">{measurePoints.length}</strong></div>
                {calculatedMeasureArea && (
                  <div className="bg-pink-950/40 p-1.5 rounded border border-pink-500/30 text-[11px] font-mono text-pink-300">
                    Area: <strong>{calculatedMeasureArea.acres} Acres</strong> ({calculatedMeasureArea.sqm.toLocaleString()} sq.m)
                  </div>
                )}
                <button
                  onClick={() => setMeasurePoints([])}
                  className="mt-1 px-2 py-0.5 bg-slate-800 text-slate-300 hover:text-white rounded text-[10px]"
                >
                  Clear Points
                </button>
              </div>
            )}
          </div>
        )}

        {/* Map Legend (Bottom Right) */}
        <div className="absolute bottom-4 right-4 z-[999] bg-slate-900/90 backdrop-blur border border-slate-800 rounded-xl p-3 shadow-2xl text-xs max-w-xs hidden sm:block">
          <div className="font-bold text-white text-xs mb-2 flex items-center space-x-1.5">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>GIS Cadastre Legend</span>
          </div>
          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded bg-emerald-600 border border-emerald-400"></span>
              <span className="text-slate-300">Agricultural Cadastre</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded bg-blue-600 border border-blue-400"></span>
              <span className="text-slate-300">Commercial / Tech Park</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded bg-amber-500 border border-amber-400"></span>
              <span className="text-slate-300">Residential Plotted / Group Housing</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded bg-purple-600 border border-purple-400"></span>
              <span className="text-slate-300">Industrial Manufacturing (GIDC)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded bg-red-600 border border-red-400 border-dashed"></span>
              <span className="text-red-400 font-semibold">Active Court Stay / Locked</span>
            </div>
          </div>
        </div>

        {/* Active Parcel Modal Card (Bottom Left) */}
        {activeParcel && (
          <MapParcelModal
            parcel={activeParcel}
            onClose={() => setActiveParcel(null)}
          />
        )}

      </div>
    </div>
  );
};
