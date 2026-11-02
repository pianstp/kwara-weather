import { useState, useCallback } from 'react';
import { fetchWeather } from '../services/weatherApi';

export function useWeather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async (location) => {
    setLoading(true);
    setError(null);
    try {
      const raw = await fetchWeather(location.latitude, location.longitude, location.timezone);
      const now = new Date();
      const currentHourISO = now.toISOString().slice(0, 13);
      const hourlyIndex = raw.hourly.time.findIndex((t) => t.startsWith(currentHourISO));
      const idx = hourlyIndex >= 0 ? hourlyIndex : 0;

      setWeather({
        location,
        current: {
          temperature: raw.current.temperature_2m,
          feelsLike: raw.current.apparent_temperature,
          humidity: raw.current.relative_humidity_2m,
          weatherCode: raw.current.weather_code,
          windSpeed: raw.current.wind_speed_10m,
          windDirection: raw.current.wind_direction_10m,
          cloudCover: raw.current.cloud_cover,
          isDay: raw.current.is_day,
          uvIndex: raw.current.uv_index,
          visibility: raw.current.visibility != null ? raw.current.visibility / 1000 : null,
          precipitation: raw.current.precipitation,
        },
        hourly: raw.hourly.time.map((t, i) => ({
          time: t,
          temperature: raw.hourly.temperature_2m[i],
          weatherCode: raw.hourly.weather_code[i],
          precipProb: raw.hourly.precipitation_probability[i],
          feelsLike: raw.hourly.apparent_temperature[i],
        })),
        daily: raw.daily.time.map((t, i) => ({
          date: t,
          weatherCode: raw.daily.weather_code[i],
          tempMax: raw.daily.temperature_2m_max[i],
          tempMin: raw.daily.temperature_2m_min[i],
          sunrise: raw.daily.sunrise[i],
          sunset: raw.daily.sunset[i],
          precipProb: raw.daily.precipitation_probability_max[i],
          uvMax: raw.daily.uv_index_max[i],
        })),
        currentHourIndex: idx,
      });
    } catch (e) {
      setError(e.message || 'Failed to fetch weather');
    } finally {
      setLoading(false);
    }
  }, []);

  return { weather, loading, error, load };
}
