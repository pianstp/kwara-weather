import { useState } from 'react';
import { Settings, Bookmark, LayoutDashboard, CloudSun, Menu, X } from 'lucide-react';
import SearchBar from './SearchBar';
import styles from './Navbar.module.css';

export default function Navbar({ onSearch, onSettingsOpen, onSavedOpen, activeSection, onNav }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <CloudSun size={22} className={styles.logoIcon} />
        <span>ATMOS</span>
      </div>

      <div className={styles.links}>
        <button
          className={`${styles.link} ${activeSection === 'dashboard' ? styles.active : ''}`}
          onClick={() => onNav('dashboard')}
        >
          <LayoutDashboard size={15} /> Dashboard
        </button>
        <button
          className={`${styles.link} ${activeSection === 'forecast' ? styles.active : ''}`}
          onClick={() => onNav('forecast')}
        >
          <CloudSun size={15} /> Forecast
        </button>
        <button
          className={`${styles.link} ${activeSection === 'saved' ? styles.active : ''}`}
          onClick={() => { onSavedOpen(); onNav('saved'); }}
        >
          <Bookmark size={15} /> Saved
        </button>
      </div>

      <div className={styles.actions}>
        <SearchBar onSelect={onSearch} />
        <button className={styles.iconBtn} onClick={onSettingsOpen} title="Settings">
          <Settings size={18} />
        </button>
      </div>

      <button className={styles.burger} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          <SearchBar onSelect={(loc) => { onSearch(loc); setMenuOpen(false); }} />
          <button className={styles.mobileLink} onClick={() => { onNav('dashboard'); setMenuOpen(false); }}>
            <LayoutDashboard size={15} /> Dashboard
          </button>
          <button className={styles.mobileLink} onClick={() => { onNav('forecast'); setMenuOpen(false); }}>
            <CloudSun size={15} /> Forecast
          </button>
          <button className={styles.mobileLink} onClick={() => { onSavedOpen(); setMenuOpen(false); }}>
            <Bookmark size={15} /> Saved Locations
          </button>
          <button className={styles.mobileLink} onClick={() => { onSettingsOpen(); setMenuOpen(false); }}>
            <Settings size={15} /> Settings
          </button>
        </div>
      )}
    </nav>
  );
}
