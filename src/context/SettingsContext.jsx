import { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext(null);

const DEFAULTS = {
  tempUnit: 'C',
  windUnit: 'kmh',
  use24h: false,
  theme: 'dark',
  savedLocations: [],
};

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    try {
      const stored = localStorage.getItem('atmos_settings');
      return stored ? { ...DEFAULTS, ...JSON.parse(stored) } : DEFAULTS;
    } catch {
      return DEFAULTS;
    }
  });

  useEffect(() => {
    localStorage.setItem('atmos_settings', JSON.stringify(settings));
    document.documentElement.setAttribute('data-theme', settings.theme);
  }, [settings]);

  function update(key, value) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  function saveLocation(loc) {
    setSettings((prev) => {
      const exists = prev.savedLocations.find((l) => l.id === loc.id);
      if (exists) return prev;
      return { ...prev, savedLocations: [...prev.savedLocations, loc] };
    });
  }

  function removeLocation(id) {
    setSettings((prev) => ({
      ...prev,
      savedLocations: prev.savedLocations.filter((l) => l.id !== id),
    }));
  }

  return (
    <SettingsContext.Provider value={{ settings, update, saveLocation, removeLocation }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
