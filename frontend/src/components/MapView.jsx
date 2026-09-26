import React, { useState, useEffect, useMemo } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  Polygon, 
  Marker, 
  Popup, 
  Tooltip, 
  Circle,
  useMap, 
  useMapEvents 
} from 'react-leaflet';
import L from 'leaflet';
import { 
  Search, 
  Layers, 
  Maximize2, 
  Ruler,
  MapPin,
  Globe,
  Filter,
  Info,
  Compass,
  Crosshair,
  Navigation,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Building,
  CreditCard,
  Scale
} from 'lucide-react';
import { useLandStack } from '../context/LandStackContext';
import { MapParcelModal } from './MapParcelModal';

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
      map.flyTo(center, zoom || 13, { duration: 1.2 });
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
    showToast
  } = useLandStack();

  const [activeParcel, setActiveParcel] = useState(selectedParcel || null);
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]); // All-India Geographic Center
  const [mapZoom, setMapZoom] = useState(5);
  const [mapBounds, setMapBounds] = useState(null);

  // Search & Hierarchical Live Location Selectors
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedTaluka, setSelectedTaluka] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');
  
  // Categorical Filters
  const [selectedLandUse, setSelectedLandUse] = useState('All');
  const [selectedRiskFilter, setSelectedRiskFilter] = useState('All');

  // Map Basemap Tile Layer (Clean English Map Services)
  const [baseTile, setBaseTile] = useState('osm'); // 'osm' | 'satellite' | 'topo'
  const [layerOpacity, setLayerOpacity] = useState(0.70);

  // Measurement Tool State
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [measurePoints, setMeasurePoints] = useState([]);

  // Live GPS Geolocation State
  const [userLocation, setUserLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(false);

  // 1. Cascading States List
  const states = useMemo(() => {
    const s = new Set(parcels.map(p => p.location?.state).filter(Boolean));
    return Array.from(s).sort();
  }, [parcels]);

  // 2. Cascading Districts List
  const districts = useMemo(() => {
    let filtered = parcels;
    if (selectedState) {
      filtered = parcels.filter(p => p.location?.state === selectedState);
    }
    const d = new Set(filtered.map(p => p.location?.district).filter(Boolean));
    return Array.from(d).sort();
  }, [parcels, selectedState]);

  // 3. Cascading Blocks / Talukas List
  const talukas = useMemo(() => {
    let filtered = parcels;
    if (selectedState) {
      filtered = filtered.filter(p => p.location?.state === selectedState);
    }
    if (selectedDistrict) {
      filtered = filtered.filter(p => p.location?.district === selectedDistrict);
    }
    const t = new Set(filtered.map(p => p.location?.taluka).filter(Boolean));
    return Array.from(t).sort();
  }, [parcels, selectedState, selectedDistrict]);

  // 4. Cascading Villages List
  const villages = useMemo(() => {
    let filtered = parcels;
    if (selectedState) {
      filtered = filtered.filter(p => p.location?.state === selectedState);
    }
    if (selectedDistrict) {
      filtered = filtered.filter(p => p.location?.district === selectedDistrict);
    }
    if (selectedTaluka) {
      filtered = filtered.filter(p => p.location?.taluka === selectedTaluka);
    }
    const v = new Set(filtered.map(p => p.location?.village).filter(Boolean));
    return Array.from(v).sort();
  }, [parcels, selectedState, selectedDistrict, selectedTaluka]);

  // Comprehensive Filtered Parcels Array
  const filteredParcels = useMemo(() => {
    return parcels.filter((parcel) => {
      const loc = parcel.location || {};

      // Search Query Matching
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesUlpin = parcel.ulpin?.toLowerCase().includes(q);
        const matchesBhuAadhaar = parcel.bhuAadhaar?.toLowerCase().includes(q);
        const matchesSurvey = parcel.surveyNo?.toLowerCase().includes(q);
        const matchesKhasra = parcel.khasraNo?.toLowerCase().includes(q);
        const matchesPlot = parcel.plotNo?.toLowerCase().includes(q);
        const matchesOwner = parcel.revenueRecords?.owners?.some(o => o.name.toLowerCase().includes(q));
        const matchesState = loc.state?.toLowerCase().includes(q);
        const matchesDistrict = loc.district?.toLowerCase().includes(q);
        const matchesTaluka = loc.taluka?.toLowerCase().includes(q);
        const matchesVillage = loc.village?.toLowerCase().includes(q);
        const matchesBank = parcel.encumbrance?.bankName?.toLowerCase().includes(q);

        if (!matchesUlpin && !matchesBhuAadhaar && !matchesSurvey && !matchesKhasra && !matchesPlot && !matchesOwner && !matchesState && !matchesDistrict && !matchesTaluka && !matchesVillage && !matchesBank) {
          return false;
        }
      }

      // Cascading Location Filters
      if (selectedState && loc.state !== selectedState) return false;
      if (selectedDistrict && loc.district !== selectedDistrict) return false;
      if (selectedTaluka && loc.taluka !== selectedTaluka) return false;
      if (selectedVillage && loc.village !== selectedVillage) return false;

      // Land Use Filter
      if (selectedLandUse !== 'All' && parcel.landUseCategory !== selectedLandUse) return false;

      // Risk / Title Status Filter
      if (selectedRiskFilter === 'Clear' && parcel.litigation?.hasLitigation) return false;
      if (selectedRiskFilter === 'Stayed' && !parcel.litigation?.hasLitigation) return false;

      return true;
    });
  }, [parcels, searchTerm, selectedState, selectedDistrict, selectedTaluka, selectedVillage, selectedLandUse, selectedRiskFilter]);

  // Sync selectedParcel from global context into activeParcel
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

  // Reset to all visible parcels extent
  const handleZoomToAll = () => {
    if (filteredParcels.length === 0) {
      setMapCenter([20.5937, 78.9629]);
      setMapZoom(5);
      return;
    }
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

  // Reset all filters to default
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedState('');
    setSelectedDistrict('');
    setSelectedTaluka('');
    setSelectedVillage('');
    setSelectedLandUse('All');
    setSelectedRiskFilter('All');
    setMapCenter([20.5937, 78.9629]);
    setMapZoom(5);
    setMapBounds(null);
  };

  // Live GPS Browser Geolocation
  const handleGetLiveGpsLocation = () => {
    if (!navigator.geolocation) {
      showToast('Geolocation is not supported by your browser.', 'error');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy
        });
        setMapCenter(coords);
        setMapZoom(16);
        setIsLocating(false);
        showToast(`Located your live GPS position (${coords[0].toFixed(4)}, ${coords[1].toFixed(4)})`, 'success');
      },
      (err) => {
        setIsLocating(false);
        // Fallback to sample center if permission denied
        setMapCenter([18.5912, 73.7389]);
        setMapZoom(15);
        showToast('GPS access permission denied or unavailable. Centered on Hinjawadi.', 'info');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Measurement Point Added
  const handlePointAdded = (point) => {
    setMeasurePoints(prev => [...prev, point]);
  };

  // Calculate stats for visible filtered parcels
  const totalVisibleAcres = useMemo(() => {
    return filteredParcels.reduce((acc, p) => acc + (p.spatialAttributes?.areaAcres || 0), 0).toFixed(2);
  }, [filteredParcels]);

  // Clean English Map Tiles
  const tileUrls = {
    osm: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri World Imagery'
    },
    topo: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri World Topo Map'
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-8rem)] lg:h-[calc(100vh-6rem)] min-h-[600px] flex flex-col bg-slate-900/20 backdrop-blur-sm overflow-hidden font-sans">
      
      {/* 1. GIS Header: English Search & Cascading State/District/Block/Village Live Selectors */}
      <div className="bg-[#103b66] border-b border-[#0a2540] p-3 text-white z-20 shadow-md shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col space-y-2">
          
          {/* Top Row: Search & Location Selectors */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2 text-xs">
            
            {/* Search Input Bar */}
            <div className="relative flex-1 min-w-[220px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search ULPIN, Survey Number, Khasra, Owner Name, Village, Block, State..."
                className="w-full pl-9 pr-3 py-1.5 bg-white text-slate-900 rounded text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
              />
            </div>

            {/* Hierarchical Live Location Selectors */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none shrink-0">
              
              {/* 1. State Selector */}
              <select
                value={selectedState}
                onChange={(e) => {
                  const stateVal = e.target.value;
                  setSelectedState(stateVal);
                  setSelectedDistrict('');
                  setSelectedTaluka('');
                  setSelectedVillage('');
                  
                  if (stateVal) {
                    const match = parcels.find(p => p.location?.state === stateVal);
                    if (match?.location?.center) {
                      setMapCenter(match.location.center);
                      setMapZoom(8);
                    }
                  } else {
                    setMapCenter([20.5937, 78.9629]);
                    setMapZoom(5);
                  }
                }}
                className="px-2.5 py-1.5 bg-white text-slate-900 border border-slate-300 rounded text-xs font-semibold focus:outline-none shrink-0"
              >
                <option value="">All States ({states.length})</option>
                {states.map(s => <option key={s} value={s}>{s}</option>)}
              </select>

              {/* 2. District Selector */}
              <select
                value={selectedDistrict}
                onChange={(e) => {
                  const distVal = e.target.value;
                  setSelectedDistrict(distVal);
                  setSelectedTaluka('');
                  setSelectedVillage('');

                  if (distVal) {
                    const match = parcels.find(p => p.location?.district === distVal);
                    if (match?.location?.center) {
                      setMapCenter(match.location.center);
                      setMapZoom(11);
                    }
                  }
                }}
                className="px-2.5 py-1.5 bg-white text-slate-900 border border-slate-300 rounded text-xs font-semibold focus:outline-none shrink-0"
              >
                <option value="">All Districts ({districts.length})</option>
                {districts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>

              {/* 3. Block / Tehsil / Taluka Selector */}
              <select
                value={selectedTaluka}
                onChange={(e) => {
                  const talukaVal = e.target.value;
                  setSelectedTaluka(talukaVal);
                  setSelectedVillage('');

                  if (talukaVal) {
                    const match = parcels.find(p => p.location?.taluka === talukaVal);
                    if (match?.location?.center) {
                      setMapCenter(match.location.center);
                      setMapZoom(13);
                    }
                  }
                }}
                className="px-2.5 py-1.5 bg-white text-slate-900 border border-slate-300 rounded text-xs font-semibold focus:outline-none shrink-0"
              >
                <option value="">All Blocks / Tehsils ({talukas.length})</option>
                {talukas.map(t => <option key={t} value={t}>{t}</option>)}
              </select>

              {/* 4. Village Selector */}
              <select
                value={selectedVillage}
                onChange={(e) => {
                  const villageVal = e.target.value;
                  setSelectedVillage(villageVal);

                  if (villageVal) {
                    const match = parcels.find(p => p.location?.village === villageVal);
                    if (match?.location?.center) {
                      setMapCenter(match.location.center);
                      setMapZoom(15);
                    }
                  }
                }}
                className="px-2.5 py-1.5 bg-white text-slate-900 border border-slate-300 rounded text-xs font-semibold focus:outline-none shrink-0"
              >
                <option value="">All Villages ({villages.length})</option>
                {villages.map(v => <option key={v} value={v}>{v}</option>)}
              </select>

              {/* Land Classification Filter */}
              <select
                value={selectedLandUse}
                onChange={(e) => setSelectedLandUse(e.target.value)}
                className="px-2 py-1.5 bg-white text-slate-900 border border-slate-300 rounded text-xs focus:outline-none shrink-0"
              >
                <option value="All">All Land Uses</option>
                <option value="Agricultural">Agricultural</option>
                <option value="Commercial">Commercial</option>
                <option value="Residential">Residential</option>
                <option value="Industrial">Industrial</option>
                <option value="Institutional">Institutional</option>
                <option value="Protected / Government">Protected / Govt</option>
              </select>

              {/* Title Status Filter */}
              <select
                value={selectedRiskFilter}
                onChange={(e) => setSelectedRiskFilter(e.target.value)}
                className="px-2 py-1.5 bg-white text-slate-900 border border-slate-300 rounded text-xs focus:outline-none shrink-0"
              >
                <option value="All">All Title Statuses</option>
                <option value="Clear">Clear Titles Only</option>
                <option value="Stayed">Court Stay Flagged</option>
              </select>

              {/* Live GPS Button */}
              <button
                onClick={handleGetLiveGpsLocation}
                className="px-2.5 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded text-xs font-bold shrink-0 flex items-center gap-1 transition-colors"
                title="Detect and Zoom to My Live GPS Location"
              >
                <Crosshair className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">My Live Location</span>
              </button>

              {(selectedState || selectedDistrict || selectedTaluka || selectedVillage || selectedLandUse !== 'All' || selectedRiskFilter !== 'All' || searchTerm) && (
                <button
                  onClick={handleResetFilters}
                  className="px-2.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs font-bold shrink-0 transition-colors"
                >
                  Reset
                </button>
              )}
            </div>

          </div>

          {/* Bottom Row: English Location Hierarchy Breadcrumb & Statistics */}
          <div className="flex flex-wrap items-center justify-between text-[11px] bg-[#0a2540] px-3 py-1.5 rounded border border-slate-700 gap-2">
            
            {/* Location Hierarchy Breadcrumb */}
            <div className="flex items-center space-x-1.5 text-slate-200">
              <Globe className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="font-semibold text-white">India</span>
              <span className="text-slate-400">›</span>
              
              <span className={selectedState ? "font-bold text-amber-300" : "text-slate-400"}>
                {selectedState || "All States"}
              </span>
              <span className="text-slate-400">›</span>

              <span className={selectedDistrict ? "font-bold text-amber-300" : "text-slate-400"}>
                {selectedDistrict || "All Districts"}
              </span>
              <span className="text-slate-400">›</span>

              <span className={selectedTaluka ? "font-bold text-amber-300" : "text-slate-400"}>
                {selectedTaluka || "All Blocks / Tehsils"}
              </span>
              <span className="text-slate-400">›</span>

              <span className={selectedVillage ? "font-bold text-amber-300" : "text-slate-400"}>
                {selectedVillage || "All Villages"}
              </span>
            </div>

            {/* Cadastral Count & Spatial Acreage */}
            <div className="flex items-center space-x-3 text-slate-300 font-mono">
              <div>
                <span>Total Parcels: </span>
                <span className="text-amber-400 font-bold">{filteredParcels.length}</span>
              </div>
              <span className="text-slate-500">|</span>
              <div>
                <span>Land Area: </span>
                <span className="text-emerald-400 font-bold">{totalVisibleAcres} Acres</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 2. Main Leaflet GIS Map Container */}
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

          {/* Live User GPS Location Indicator */}
          {userLocation && (
            <>
              <Circle
                center={[userLocation.lat, userLocation.lng]}
                radius={userLocation.accuracy || 100}
                pathOptions={{
                  color: '#3b82f6',
                  fillColor: '#3b82f6',
                  fillOpacity: 0.15,
                  weight: 1
                }}
              />
              <Marker position={[userLocation.lat, userLocation.lng]}>
                <Popup>
                  <div className="text-xs font-sans p-1">
                    <div className="font-bold text-blue-700 flex items-center gap-1">
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Your Live GPS Position</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 font-mono">
                      Lat: {userLocation.lat.toFixed(5)}, Lng: {userLocation.lng.toFixed(5)}
                    </p>
                  </div>
                </Popup>
              </Marker>
            </>
          )}

          {/* Render Cadastral Parcel Polygons */}
          {filteredParcels.map((parcel) => {
            const coords = getLeafletCoords(parcel.geometry);
            const isSelected = activeParcel?.ulpin === parcel.ulpin;
            const isStayed = parcel.litigation?.hasLitigation;
            const loc = parcel.location || {};

            return (
              <React.Fragment key={parcel.ulpin}>
                {/* Polygon Boundary */}
                <Polygon
                  positions={coords}
                  pathOptions={{
                    color: isSelected ? '#d97706' : isStayed ? '#b91c1c' : parcel.colorCode || '#103b66',
                    fillColor: isStayed ? '#dc2626' : parcel.colorCode || '#103b66',
                    fillOpacity: isSelected ? 0.85 : layerOpacity,
                    weight: isSelected ? 4 : 2,
                    dashArray: isStayed ? '5, 5' : null
                  }}
                  eventHandlers={{
                    click: () => handleParcelClick(parcel)
                  }}
                >
                  <Tooltip sticky direction="top" className="custom-map-tooltip">
                    <div className="text-xs p-1.5 max-w-xs font-sans">
                      <div className="font-bold text-[#103b66] font-mono text-xs flex items-center justify-between gap-2 border-b pb-1 mb-1">
                        <span>{parcel.ulpin}</span>
                        {isStayed && <span className="text-red-700 font-bold">[COURT STAY]</span>}
                      </div>
                      <div className="text-[11px] text-slate-800 font-medium">
                        Owner: {parcel.revenueRecords?.owners?.[0]?.name || 'N/A'}
                      </div>
                      <div className="text-[10px] text-slate-600 mt-0.5">
                        Survey / Khasra: {parcel.surveyNo || parcel.khasraNo} • {parcel.landUseCategory}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        Location: {loc.village}, {loc.taluka}, {loc.district}, {loc.state}
                      </div>
                      <div className="text-[10px] text-[#103b66] font-bold mt-1">
                        Area: {parcel.spatialAttributes?.areaAcres} Acres ({parcel.spatialAttributes?.areaHectares} Ha)
                      </div>
                    </div>
                  </Tooltip>
                </Polygon>

                {/* Marker at Parcel Center */}
                {loc.center && (
                  <Marker
                    position={loc.center}
                    eventHandlers={{
                      click: () => handleParcelClick(parcel)
                    }}
                  >
                    <Popup className="custom-map-popup">
                      <div className="text-xs p-1 font-sans">
                        <div className="font-bold text-[#103b66] font-mono border-b pb-1">{parcel.ulpin}</div>
                        <div className="text-[11px] text-slate-800 font-bold mt-1">{parcel.revenueRecords?.owners?.[0]?.name}</div>
                        <div className="text-[10px] text-slate-600 mt-0.5">{loc.village}, {loc.taluka}, {loc.district}, {loc.state}</div>
                        <div className="text-[10px] text-slate-600 mt-0.5 font-semibold">Survey: {parcel.surveyNo} • {parcel.spatialAttributes?.areaAcres} Acres</div>
                        <button
                          onClick={() => handleParcelClick(parcel)}
                          className="mt-2 w-full py-1 bg-[#103b66] hover:bg-[#0a2540] text-white rounded text-[11px] font-bold transition-colors"
                        >
                          View Official Land Dossier
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                )}
              </React.Fragment>
            );
          })}

          {/* Measure Polygon */}
          {measurePoints.length > 0 && (
            <Polygon
              positions={measurePoints}
              pathOptions={{
                color: '#d97706',
                fillColor: '#d97706',
                fillOpacity: 0.35,
                weight: 2,
                dashArray: '4, 4'
              }}
            />
          )}
        </MapContainer>

        {/* Floating Map Controls (Top Right) */}
        <div className="absolute top-4 right-4 z-[999] flex flex-col space-y-2">
          
          {/* Basemap Switcher */}
          <div className="gov-card p-2 text-xs shadow-lg bg-white/95 backdrop-blur-sm">
            <span className="text-[10px] font-bold text-slate-500 block uppercase mb-1">
              Basemap Layer
            </span>
            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={() => setBaseTile('osm')}
                className={`px-2 py-1 rounded text-[11px] font-bold transition-colors ${
                  baseTile === 'osm' ? 'bg-[#103b66] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                OSM Map
              </button>
              <button
                onClick={() => setBaseTile('satellite')}
                className={`px-2 py-1 rounded text-[11px] font-bold transition-colors ${
                  baseTile === 'satellite' ? 'bg-[#103b66] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Satellite
              </button>
              <button
                onClick={() => setBaseTile('topo')}
                className={`px-2 py-1 rounded text-[11px] font-bold transition-colors ${
                  baseTile === 'topo' ? 'bg-[#103b66] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Topo Map
              </button>
            </div>
          </div>

          {/* Zoom & Measure Tools */}
          <div className="gov-card p-2 text-xs shadow-lg bg-white/95 backdrop-blur-sm flex flex-col space-y-1">
            <button
              onClick={handleZoomToAll}
              className="gov-btn-secondary py-1 text-[11px] justify-start"
              title="Zoom to Extent of all Filtered Parcels"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#103b66]" />
              <span>Zoom All Parcels</span>
            </button>

            <button
              onClick={() => {
                setIsMeasuring(!isMeasuring);
                setMeasurePoints([]);
              }}
              className={`py-1 px-2 rounded text-[11px] font-bold flex items-center gap-1.5 transition-colors ${
                isMeasuring ? 'bg-amber-100 text-amber-900 border border-amber-400' : 'gov-btn-secondary justify-start'
              }`}
            >
              <Ruler className="w-3.5 h-3.5 text-amber-700" />
              <span>{isMeasuring ? 'Exit Measurement' : 'Measure Area'}</span>
            </button>
          </div>

          {/* Boundary Opacity Control */}
          <div className="gov-card p-2 text-xs shadow-lg bg-white/95 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-1 text-[11px]">
              <span className="text-slate-600 font-semibold">Boundary Opacity:</span>
              <span className="font-mono font-bold text-[#103b66]">{Math.round(layerOpacity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={layerOpacity}
              onChange={(e) => setLayerOpacity(parseFloat(e.target.value))}
              className="w-full accent-[#103b66] cursor-pointer h-1.5 bg-slate-200 rounded"
            />
          </div>
        </div>

        {/* English GIS Cadastral Layer Legend (Bottom Right) */}
        <div className="absolute bottom-4 right-4 z-[999] gov-card p-3 shadow-lg text-xs max-w-xs hidden sm:block bg-white/95 backdrop-blur-sm">
          <div className="font-bold text-[#103b66] text-xs mb-2 flex items-center space-x-1.5 border-b border-slate-200 pb-1">
            <Layers className="w-3.5 h-3.5 text-amber-600" />
            <span>GIS Cadastral Layer Legend</span>
          </div>
          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded bg-emerald-700"></span>
              <span className="text-slate-800 font-medium">Agricultural Land</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded bg-blue-700"></span>
              <span className="text-slate-800 font-medium">Commercial Zone</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded bg-amber-600"></span>
              <span className="text-slate-800 font-medium">Residential Zone</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded bg-purple-700"></span>
              <span className="text-slate-800 font-medium">Industrial Zone (GIDC / MIDC)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded bg-indigo-700"></span>
              <span className="text-slate-800 font-medium">Institutional Campus</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded bg-red-600 border border-red-800 border-dashed"></span>
              <span className="text-red-700 font-bold">Court Stay / Litigation Flagged</span>
            </div>
          </div>
        </div>

        {/* Selected Parcel Full Info Card Modal (Bottom Left) */}
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
