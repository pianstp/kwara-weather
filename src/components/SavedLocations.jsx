import { X, MapPin, Trash2 } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import styles from './SavedLocations.module.css';

export default function SavedLocations({ onSelect, onClose }) {
  const { settings, removeLocation } = useSettings();
  const { savedLocations } = settings;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.heading}>Saved Locations</h2>
          <button className={styles.close} onClick={onClose}><X size={18} /></button>
        </div>
        {savedLocations.length === 0 ? (
          <p className={styles.empty}>No saved locations yet. Search for a city and bookmark it.</p>
        ) : (
          <ul className={styles.list}>
            {savedLocations.map((loc) => (
              <li key={loc.id} className={styles.item}>
                <button className={styles.locBtn} onClick={() => { onSelect(loc); onClose(); }}>
                  <MapPin size={14} className={styles.pin} />
                  <span>
                    <strong>{loc.name}</strong>
                    {loc.region && `, ${loc.region}`}
                    {loc.country && ` · ${loc.country}`}
                  </span>
                </button>
                <button className={styles.remove} onClick={() => removeLocation(loc.id)}>
                  <Trash2 size={14} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
