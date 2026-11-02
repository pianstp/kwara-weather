const WEATHER_BASE = 'https://api.open-meteo.com/v1/forecast';

export async function fetchWeather(latitude, longitude, timezone) {
  const params = new URLSearchParams({
    latitude,
    longitude,
    timezone,
    current: [
      'temperature_2m',
      'apparent_temperature',
      'relative_humidity_2m',
      'weather_code',
      'wind_speed_10m',
      'wind_direction_10m',
      'cloud_cover',
      'is_day',
      'uv_index',
      'visibility',
      'precipitation',
    ].join(','),
    hourly: [
      'temperature_2m',
      'weather_code',
      'precipitation_probability',
      'apparent_temperature',
    ].join(','),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'sunrise',
      'sunset',
      'precipitation_probability_max',
      'uv_index_max',
    ].join(','),
    forecast_days: 7,
  });

  const res = await fetch(`${WEATHER_BASE}?${params}`);
  if (!res.ok) throw new Error('Weather request failed');
  return res.json();
}
