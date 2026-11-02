import { useState } from 'react';
import { SettingsProvider } from './context/SettingsContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import SettingsPanel from './components/SettingsPanel';
import SavedLocations from './components/SavedLocations';

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <SettingsProvider>
      <div style={{ overflowX: 'hidden', width: '100%', minHeight: '100vh' }}>
        <Navbar
          onSearch={setSelectedLocation}
          onSettingsOpen={() => setShowSettings(true)}
          onSavedOpen={() => setShowSaved(true)}
          activeSection={activeSection}
          onNav={setActiveSection}
        />
        <Dashboard selectedLocation={selectedLocation} />
        {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
        {showSaved && (
          <SavedLocations
            onSelect={setSelectedLocation}
            onClose={() => setShowSaved(false)}
          />
        )}
      </div>
    </SettingsProvider>
  );
}

export default App;
