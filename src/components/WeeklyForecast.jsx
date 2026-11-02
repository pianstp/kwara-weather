import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { getWeatherInfo } from '../utils/weatherCodes';
import { formatTemp } from '../utils/formatTemperature';
import { formatDayShort, formatDateShort } from '../utils/formatTime';
import { useSettings } from '../context/SettingsContext';
import styles from './WeeklyForecast.module.css';

export default function WeeklyForecast({ daily }) {
  const { settings } = useSettings();
  const [expanded, setExpanded] = useState(null);

  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>7-Day Forecast</h2>
      <div className={styles.list}>
        {daily.map((day, i) => {
          const info = getWeatherInfo(day.weatherCode, true);
          const isOpen = expanded === i;
          return (
            <div key={day.date} className={styles.item}>
              <button className={styles.row} onClick={() => setExpanded(isOpen ? null : i)}>
                <span className={styles.day}>
                  <strong>{i === 0 ? 'Today' : formatDayShort(day.date)}</strong>
                  <span className={styles.date}>{formatDateShort(day.date)}</span>
                </span>
                <span className={styles.icon}>{info.icon}</span>
                <span className={styles.desc}>{info.label}</span>
                <span className={styles.temps}>
                  <span className={styles.high}>{formatTemp(day.tempMax, settings.tempUnit)}</span>
                  <span className={styles.low}>{formatTemp(day.tempMin, settings.tempUnit)}</span>
                </span>
                {isOpen ? <ChevronUp size={14} className={styles.chevron} /> : <ChevronDown size={14} className={styles.chevron} />}
              </button>
              {isOpen && (
                <div className={styles.detail}>
                  <span>💧 Rain: {day.precipProb ?? '--'}%</span>
                  <span>☀️ UV Max: {day.uvMax ?? '--'}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
