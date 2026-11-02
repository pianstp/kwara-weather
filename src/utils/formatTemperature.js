export function formatTemp(temp, unit) {
  if (temp === null || temp === undefined) return '--';
  const val = unit === 'F' ? Math.round((temp * 9) / 5 + 32) : Math.round(temp);
  return `${val}°${unit}`;
}

export function formatTempValue(temp, unit) {
  if (temp === null || temp === undefined) return '--';
  return unit === 'F' ? Math.round((temp * 9) / 5 + 32) : Math.round(temp);
}

export function formatWind(speed, unit) {
  if (speed === null || speed === undefined) return '--';
  if (unit === 'mph') return `${Math.round(speed * 0.621371)} mph`;
  if (unit === 'ms') return `${Math.round(speed / 3.6)} m/s`;
  return `${Math.round(speed)} km/h`;
}
