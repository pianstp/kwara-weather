const GEO_BASE = 'https://geocoding-api.open-meteo.com/v1';

export async function searchLocations(query) {
  if (!query || query.trim().length < 2) return [];
  const res = await fetch(
    `${GEO_BASE}/search?name=${encodeURIComponent(query)}&count=8&language=en&format=json`
  );
  if (!res.ok) throw new Error('Geocoding request failed');
  const data = await res.json();
  return (data.results || []).map((r) => ({
    id: r.id,
    name: r.name,
    region: r.admin1 || '',
    country: r.country || '',
    latitude: r.latitude,
    longitude: r.longitude,
    timezone: r.timezone,
  }));
}
