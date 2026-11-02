import { Sunrise, Sunset } from 'lucide-react';
import { formatTime, getDaylightDuration } from '../utils/formatTime';
import { useSettings } from '../context/SettingsContext';
import styles from './SunriseSunset.module.css';

export default function SunriseSunset({ sunrise, sunset, timezone }) {
  const { settings } = useSettings();
  const now = new Date();
  const riseTime = new Date(sunrise);
  const setTime = new Date(sunset);
  const total = setTime - riseTime;
  const elapsed = Math.min(Math.max(now - riseTime, 0), total);
  const progress = total > 0 ? (elapsed / total) * 100 : 0;

  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>Sun</h2>
      <div className={styles.arc}>
        <div className={styles.track}>
          <div className={styles.fill} style={{ width: `${progress}%` }} />
          <div className={styles.sun} style={{ left: `${progress}%` }}>☀️</div>
        </div>
      </div>
      <div className={styles.times}>
        <div className={styles.timeItem}>
          <Sunrise size={18} className={styles.riseIcon} />
          <span className={styles.label}>Sunrise</span>
          <span className={styles.time}>{formatTime(sunrise, timezone, settings.use24h)}</span>
        </div>
        <div className={styles.duration}>
          {getDaylightDuration(sunrise, sunset)} daylight
        </div>
        <div className={styles.timeItem}>
          <Sunset size={18} className={styles.setIcon} />
          <span className={styles.label}>Sunset</span>
          <span className={styles.time}>{formatTime(sunset, timezone, settings.use24h)}</span>
        </div>
      </div>
    </div>
  );
}
