// Utility helpers for Land Stack GovTech UI

export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) return '₹ 0';
  if (typeof amount === 'string') return amount;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatArea = (hectares) => {
  if (!hectares) return '0 Ha';
  const acres = (hectares * 2.47105).toFixed(2);
  const sqMeters = (hectares * 10000).toLocaleString('en-IN');
  const gunthas = (hectares * 98.842).toFixed(1);
  return {
    hectares: `${hectares} Ha`,
    acres: `${acres} Acres`,
    sqMeters: `${sqMeters} sq.m`,
    gunthas: `${gunthas} Gunthas`
  };
};

export const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return dateStr;
  }
};

export const getRiskBadgeColor = (riskScore) => {
  if (riskScore >= 90) return { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', label: 'Clear Title / Low Risk' };
  if (riskScore >= 70) return { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30', label: 'Moderate Risk / Scrutiny' };
  return { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30', label: 'HIGH RISK / STAY ORDER' };
};

export const getLandUseBadge = (category) => {
  const map = {
    'Agricultural': { bg: 'bg-emerald-600/20', text: 'text-emerald-400', border: 'border-emerald-500/30' },
    'Commercial': { bg: 'bg-blue-600/20', text: 'text-blue-400', border: 'border-blue-500/30' },
    'Residential': { bg: 'bg-amber-600/20', text: 'text-amber-400', border: 'border-amber-500/30' },
    'Industrial': { bg: 'bg-purple-600/20', text: 'text-purple-400', border: 'border-purple-500/30' },
    'Institutional': { bg: 'bg-indigo-600/20', text: 'text-indigo-400', border: 'border-indigo-500/30' },
    'Protected / Government': { bg: 'bg-cyan-600/20', text: 'text-cyan-400', border: 'border-cyan-500/30' }
  };
  return map[category] || { bg: 'bg-slate-700/30', text: 'text-slate-300', border: 'border-slate-600' };
};
