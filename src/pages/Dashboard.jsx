import { useEffect } from 'react';
import { CloudOff, RefreshCw } from 'lucide-react';
import { useWeather } from '../hooks/useWeather';
import { getWeatherInfo } from '../utils/weatherCodes';
import CurrentWeather from '../components/CurrentWeather';
import WeatherMetrics from '../components/WeatherMetrics';
import HourlyForecast from '../components/HourlyForecast';
import TemperatureChart from '../components/TemperatureChart';
import WeeklyForecast from '../components/WeeklyForecast';
import SunriseSunset from '../components/SunriseSunset';
import WeatherSkeleton from '../components/WeatherSkeleton';
import styles from './Dashboard.module.css';

const DEFAULT_LOCATION = {
  id: 2339354,
  name: 'Ilorin',
  region: 'Kwara',
  country: 'Nigeria',
  latitude: 8.5,
  longitude: 4.55,
  timezone: 'Africa/Lagos',
};

export default function Dashboard({ selectedLocation }) {
  const { weather, loading, error, load } = useWeather();
  const location = selectedLocation || DEFAULT_LOCATION;

  useEffect(() => {
    load(location);
  }, [location, load]);

  const bgClass = weather
    ? styles[getWeatherInfo(weather.current.weatherCode, weather.current.isDay).bg]
    : styles.night;

  if (loading) {
    return (
      <div className={`${styles.page} ${styles.night}`}>
        <div className={styles.card}>
          <WeatherSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.page} ${styles.night}`}>
        <div className={styles.errorWrap}>
          <CloudOff size={48} className={styles.errorIcon} />
          <h2 className={styles.errorTitle}>Something went wrong</h2>
          <p className={styles.errorMsg}>{error}</p>
          <button className={styles.retryBtn} onClick={() => load(location)}>
            <RefreshCw size={15} /> Try again
          </button>
        </div>
      </div>
    );
  }

  if (!weather) return null;

  const today = weather.daily[0];

  return (
    <div className={`${styles.page} ${bgClass}`}>
      <div className={styles.layout}>
        <div className={styles.mainCol}>
          <div className={styles.card}>
            <CurrentWeather weather={weather} />
            <WeatherMetrics current={weather.current} />
            <HourlyForecast
              hourly={weather.hourly}
              currentIndex={weather.currentHourIndex}
              timezone={weather.location.timezone}
            />
            <TemperatureChart
              hourly={weather.hourly}
              currentIndex={weather.currentHourIndex}
              timezone={weather.location.timezone}
            />
          </div>
        </div>

        <div className={styles.sideCol}>
          <div className={styles.card}>
            <WeeklyForecast daily={weather.daily} />
          </div>
          <SunriseSunset
            sunrise={today.sunrise}
            sunset={today.sunset}
            timezone={weather.location.timezone}
          />
        </div>
      </div>
    </div>
  );
}
