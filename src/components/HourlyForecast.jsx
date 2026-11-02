import { useRef } from 'react';
import { getWeatherInfo } from '../utils/weatherCodes';
import { formatTempValue } from '../utils/formatTemperature';
import { formatHour } from '../utils/formatTime';
import { useSettings } from '../context/SettingsContext';
import styles from './HourlyForecast.module.css';

export default function HourlyForecast({ hourly, currentIndex, timezone }) {
  const { settings } = useSettings();
  const scrollRef = useRef(null);
  const slice = hourly.slice(Math.max(0, currentIndex - 1), currentIndex + 23);

  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>Hourly Forecast</h2>
      <div className={styles.scroll} ref={scrollRef}>
        {slice.map((h, i) => {
          const isCurrent = i === (currentIndex > 0 ? 1 : 0);
          const info = getWeatherInfo(h.weatherCode, true);
          const isPast = i < (currentIndex > 0 ? 1 : 0);
          return (
            <div
              key={h.time}
              className={`${styles.item} ${isCurrent ? styles.current : ''} ${isPast ? styles.past : ''}`}
            >
              <span className={styles.time}>
                {isCurrent ? 'Now' : formatHour(h.time, timezone, settings.use24h)}
              </span>
              <span className={styles.icon}>{info.icon}</span>
              <span className={styles.temp}>
                {formatTempValue(h.temperature, settings.tempUnit)}°
              </span>
              {h.precipProb > 0 && (
                <span className={styles.precip}>💧{h.precipProb}%</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
