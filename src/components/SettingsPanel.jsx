import { X, Thermometer, Wind, Clock, Moon } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import styles from './SettingsPanel.module.css';

export default function SettingsPanel({ onClose }) {
  const { settings, update } = useSettings();

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.heading}>Settings</h2>
          <button className={styles.close} onClick={onClose}><X size={18} /></button>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}><Thermometer size={15} /> Temperature</div>
          <div className={styles.options}>
            {['C', 'F'].map((u) => (
              <button
                key={u}
                className={`${styles.opt} ${settings.tempUnit === u ? styles.active : ''}`}
                onClick={() => update('tempUnit', u)}
              >
                °{u}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}><Wind size={15} /> Wind Speed</div>
          <div className={styles.options}>
            {[['kmh', 'km/h'], ['ms', 'm/s'], ['mph', 'mph']].map(([val, label]) => (
              <button
                key={val}
                className={`${styles.opt} ${settings.windUnit === val ? styles.active : ''}`}
                onClick={() => update('windUnit', val)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}><Clock size={15} /> Time Format</div>
          <div className={styles.options}>
            <button
              className={`${styles.opt} ${!settings.use24h ? styles.active : ''}`}
              onClick={() => update('use24h', false)}
            >
              12h
            </button>
            <button
              className={`${styles.opt} ${settings.use24h ? styles.active : ''}`}
              onClick={() => update('use24h', true)}
            >
              24h
            </button>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}><Moon size={15} /> Theme</div>
          <div className={styles.options}>
            {['dark', 'light', 'system'].map((t) => (
              <button
                key={t}
                className={`${styles.opt} ${settings.theme === t ? styles.active : ''}`}
                onClick={() => update('theme', t)}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
