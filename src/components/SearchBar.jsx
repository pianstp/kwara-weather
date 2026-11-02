import { useState, useRef, useEffect } from 'react';
import { Search, X, MapPin } from 'lucide-react';
import { searchLocations } from '../services/geocodingApi';
import styles from './SearchBar.module.css';

export default function SearchBar({ onSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const timerRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleChange(e) {
    const val = e.target.value;
    setQuery(val);
    clearTimeout(timerRef.current);
    if (val.trim().length < 2) { setResults([]); setOpen(false); return; }
    timerRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await searchLocations(val);
        setResults(res);
        setOpen(true);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);
  }

  function handleSelect(loc) {
    setQuery('');
    setResults([]);
    setOpen(false);
    onSelect(loc);
  }

  function clear() {
    setQuery('');
    setResults([]);
    setOpen(false);
  }

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <div className={styles.inputWrap}>
        <Search size={16} className={styles.icon} />
        <input
          className={styles.input}
          type="text"
          placeholder="Search city..."
          value={query}
          onChange={handleChange}
          onFocus={() => results.length > 0 && setOpen(true)}
        />
        {query && <button className={styles.clear} onClick={clear}><X size={14} /></button>}
      </div>
      {open && (
        <ul className={styles.dropdown}>
          {loading && <li className={styles.info}>Searching...</li>}
          {!loading && results.length === 0 && (
            <li className={styles.info}>No results found</li>
          )}
          {results.map((loc) => (
            <li key={loc.id} className={styles.item} onClick={() => handleSelect(loc)}>
              <MapPin size={13} className={styles.pin} />
              <span>
                <strong>{loc.name}</strong>
                {loc.region && `, ${loc.region}`}
                {loc.country && ` · ${loc.country}`}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
