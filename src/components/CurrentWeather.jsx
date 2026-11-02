import { MapPin, Bookmark, BookmarkCheck } from 'lucide-react';
import { getWeatherInfo } from '../utils/weatherCodes';
import { formatTemp } from '../utils/formatTemperature';
import { getCurrentLocalDate, getCurrentLocalTime } from '../utils/formatTime';
import { useSettings } from '../context/SettingsContext';
import styles from './CurrentWeather.module.css';

export default function CurrentWeather({ weather }) {
  const { settings, saveLocation, removeLocation } = useSettings();
  const { current, location, daily } = weather;
  const info = getWeatherInfo(current.weatherCode, current.isDay);
  const today = daily[0];
  const isSaved = settings.savedLocations.find((l) => l.id === location.id);

  function toggleSave() {
    if (isSaved) removeLocation(location.id);
    else saveLocation(location);
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.locationRow}>
        <MapPin size={16} className={styles.pin} />
        <div>
          <h1 className={styles.city}>{location.name}</h1>
          <p className={styles.region}>
            {location.region && `${location.region}, `}{location.country}
          </p>
        </div>
        <button className={styles.saveBtn} onClick={toggleSave} title={isSaved ? 'Remove' : 'Save'}>
          {isSaved ? <BookmarkCheck size={18} className={styles.saved} /> : <Bookmark size={18} />}
        </button>
      </div>

      <p className={styles.dateTime}>
        {getCurrentLocalDate(location.timezone)} &nbsp;·&nbsp;{' '}
        {getCurrentLocalTime(location.timezone, settings.use24h)}
      </p>

      <div className={styles.main}>
        <span className={styles.icon}>{info.icon}</span>
        <div>
          <div className={styles.temp}>
            {formatTemp(current.temperature, settings.tempUnit)}
          </div>
          <div className={styles.condition}>{info.label}</div>
          <div className={styles.feels}>
            Feels like {formatTemp(current.feelsLike, settings.tempUnit)}
          </div>
        </div>
      </div>

      <div className={styles.hiLo}>
        <span>H: {formatTemp(today.tempMax, settings.tempUnit)}</span>
        <span className={styles.dot}>·</span>
        <span>L: {formatTemp(today.tempMin, settings.tempUnit)}</span>
      </div>
    </div>
  );
}
