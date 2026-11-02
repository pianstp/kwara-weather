export const weatherCodes = {
  0: { label: 'Clear Sky', icon: '☀️', bg: 'sunny' },
  1: { label: 'Mainly Clear', icon: '🌤️', bg: 'sunny' },
  2: { label: 'Partly Cloudy', icon: '⛅', bg: 'cloudy' },
  3: { label: 'Overcast', icon: '☁️', bg: 'cloudy' },
  45: { label: 'Foggy', icon: '🌫️', bg: 'cloudy' },
  48: { label: 'Icy Fog', icon: '🌫️', bg: 'cloudy' },
  51: { label: 'Light Drizzle', icon: '🌦️', bg: 'rainy' },
  53: { label: 'Drizzle', icon: '🌦️', bg: 'rainy' },
  55: { label: 'Heavy Drizzle', icon: '🌧️', bg: 'rainy' },
  61: { label: 'Light Rain', icon: '🌧️', bg: 'rainy' },
  63: { label: 'Rain', icon: '🌧️', bg: 'rainy' },
  65: { label: 'Heavy Rain', icon: '🌧️', bg: 'rainy' },
  71: { label: 'Light Snow', icon: '🌨️', bg: 'cloudy' },
  73: { label: 'Snow', icon: '❄️', bg: 'cloudy' },
  75: { label: 'Heavy Snow', icon: '❄️', bg: 'cloudy' },
  77: { label: 'Snow Grains', icon: '🌨️', bg: 'cloudy' },
  80: { label: 'Light Showers', icon: '🌦️', bg: 'rainy' },
  81: { label: 'Showers', icon: '🌧️', bg: 'rainy' },
  82: { label: 'Heavy Showers', icon: '⛈️', bg: 'rainy' },
  85: { label: 'Snow Showers', icon: '🌨️', bg: 'cloudy' },
  86: { label: 'Heavy Snow Showers', icon: '❄️', bg: 'cloudy' },
  95: { label: 'Thunderstorm', icon: '⛈️', bg: 'storm' },
  96: { label: 'Thunderstorm w/ Hail', icon: '⛈️', bg: 'storm' },
  99: { label: 'Thunderstorm w/ Heavy Hail', icon: '⛈️', bg: 'storm' },
};

export function getWeatherInfo(code, isDay = true) {
  const info = weatherCodes[code] || { label: 'Unknown', icon: '🌡️', bg: 'cloudy' };
  if (!isDay && (info.bg === 'sunny' || info.bg === 'cloudy')) {
    return { ...info, bg: 'night' };
  }
  return info;
}

export function getUVLabel(uv) {
  if (uv <= 2) return { label: 'Low', color: '#4ade80' };
  if (uv <= 5) return { label: 'Moderate', color: '#facc15' };
  if (uv <= 7) return { label: 'High', color: '#fb923c' };
  if (uv <= 10) return { label: 'Very High', color: '#f87171' };
  return { label: 'Extreme', color: '#c084fc' };
}

export function getWindDirection(deg) {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return dirs[Math.round(deg / 45) % 8];
}

export function getHumidityLabel(h) {
  if (h < 30) return 'Low humidity';
  if (h < 60) return 'Comfortable';
  if (h < 80) return 'Moderate humidity';
  return 'High humidity';
}

export function getVisibilityLabel(v) {
  if (v >= 10) return 'Excellent';
  if (v >= 5) return 'Good';
  if (v >= 2) return 'Moderate';
  return 'Poor';
}
