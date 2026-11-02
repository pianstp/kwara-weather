import { Droplets, Wind, Eye, Gauge, Sun, Navigation } from 'lucide-react';
import { getUVLabel, getWindDirection, getHumidityLabel, getVisibilityLabel } from '../utils/weatherCodes';
import { formatWind } from '../utils/formatTemperature';
import { useSettings } from '../context/SettingsContext';
import styles from './WeatherMetrics.module.css';

export default function WeatherMetrics({ current }) {
  const { settings } = useSettings();
  const uvInfo = getUVLabel(current.uvIndex);

  const cards = [
    {
      icon: <Droplets size={20} />,
      label: 'Humidity',
      value: `${current.humidity}%`,
      sub: getHumidityLabel(current.humidity),
      color: '#0ea5e9',
    },
    {
      icon: <Wind size={20} />,
      label: 'Wind Speed',
      value: formatWind(current.windSpeed, settings.windUnit),
      sub: getWindDirection(current.windDirection),
      color: '#6366f1',
    },
    {
      icon: <Navigation size={20} />,
      label: 'Wind Direction',
      value: getWindDirection(current.windDirection),
      sub: `${current.windDirection}°`,
      color: '#8b5cf6',
    },
    {
      icon: <Eye size={20} />,
      label: 'Visibility',
      value: current.visibility != null ? `${current.visibility.toFixed(1)} km` : '--',
      sub: current.visibility != null ? getVisibilityLabel(current.visibility) : '',
      color: '#10b981',
    },
    {
      icon: <Gauge size={20} />,
      label: 'Cloud Cover',
      value: `${current.cloudCover}%`,
      sub: current.cloudCover < 25 ? 'Clear skies' : current.cloudCover < 75 ? 'Partly cloudy' : 'Overcast',
      color: '#64748b',
    },
    {
      icon: <Sun size={20} />,
      label: 'UV Index',
      value: current.uvIndex != null ? current.uvIndex.toFixed(1) : '--',
      sub: uvInfo.label,
      color: uvInfo.color,
    },
  ];

  return (
    <div className={styles.grid}>
      {cards.map((c) => (
        <div key={c.label} className={styles.card}>
          <div className={styles.header}>
            <span className={styles.cardIcon} style={{ color: c.color }}>{c.icon}</span>
            <span className={styles.label}>{c.label}</span>
          </div>
          <div className={styles.value} style={{ color: c.color }}>{c.value}</div>
          <div className={styles.sub}>{c.sub}</div>
        </div>
      ))}
    </div>
  );
}
