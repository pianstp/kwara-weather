# ATMOS — Weather Intelligence Dashboard

A modern, responsive weather forecasting application built with React. ATMOS delivers real-time weather data through a clean, atmospheric dashboard interface powered by the Open-Meteo API — no API key required.

---

## Live Demo

> Deploy to Vercel or Netlify and paste your link here.

---

## Screenshots

> Add desktop and mobile screenshots here after deployment.

---

## Features

- **Current weather** — temperature, feels-like, condition, high/low, weather icon
- **Weather metrics** — humidity, wind speed & direction, visibility, cloud cover, UV index
- **Hourly forecast** — 24-hour scrollable timeline with precipitation probability, current hour highlighted
- **Temperature chart** — interactive area chart showing temperature trend across the day (Recharts)
- **7-day forecast** — expandable daily cards with high/low temps, condition, rain probability and UV max
- **Sunrise & sunset** — animated sun-path progress bar with daylight duration
- **City search** — debounced search with location suggestions (city, region, country context)
- **Saved locations** — bookmark favourite cities, switch between them instantly
- **Settings panel** — toggle temperature unit (°C / °F), wind speed unit (km/h / m/s / mph), time format (12h / 24h), and theme
- **Weather-dependent backgrounds** — page gradient changes based on condition (sunny, cloudy, rainy, storm, night)
- **Loading skeletons** — shimmer placeholders while data fetches
- **Error handling** — network failures, API errors, and empty search results all handled gracefully
- **Fully responsive** — works on desktop, tablet, and mobile at 100% zoom

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Create React App | Build tooling |
| CSS Modules | Component-scoped styling |
| Recharts | Temperature trend chart |
| Lucide React | Icons |
| Open-Meteo API | Weather forecast data (no API key) |
| Open-Meteo Geocoding API | City search & coordinates |
| LocalStorage | Persisted settings and saved locations |

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx / .module.css
│   ├── SearchBar.jsx / .module.css
│   ├── CurrentWeather.jsx / .module.css
│   ├── WeatherMetrics.jsx / .module.css
│   ├── HourlyForecast.jsx / .module.css
│   ├── TemperatureChart.jsx / .module.css
│   ├── WeeklyForecast.jsx / .module.css
│   ├── SunriseSunset.jsx / .module.css
│   ├── SettingsPanel.jsx / .module.css
│   ├── SavedLocations.jsx / .module.css
│   └── WeatherSkeleton.jsx / .module.css
├── pages/
│   └── Dashboard.jsx / .module.css
├── services/
│   ├── weatherApi.js        # Open-Meteo forecast requests
│   └── geocodingApi.js      # Open-Meteo city search
├── hooks/
│   └── useWeather.js        # Data fetching & state
├── context/
│   └── SettingsContext.jsx  # Global settings (units, theme, saved locations)
├── utils/
│   ├── weatherCodes.js      # WMO code → label, icon, background
│   ├── formatTemperature.js # °C ↔ °F, wind unit conversion
│   └── formatTime.js        # Time, date, daylight duration formatting
├── App.js
└── index.css
```

---

## Getting Started

### Prerequisites

- Node.js 16 or higher
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/pianstp/kwara-weather.git
cd kwara-weather

# Install dependencies
npm install

# Start the development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

The optimised build will be in the `build/` folder, ready to deploy.

---

## API Reference

ATMOS uses two free Open-Meteo endpoints — no account or API key needed.

### Geocoding

```
GET https://geocoding-api.open-meteo.com/v1/search?name={city}&count=8
```

Converts a city name into latitude, longitude, and timezone.

### Weather Forecast

```
GET https://api.open-meteo.com/v1/forecast
  ?latitude={lat}
  &longitude={lon}
  &timezone={tz}
  &current=temperature_2m,apparent_temperature,relative_humidity_2m,
           weather_code,wind_speed_10m,wind_direction_10m,
           cloud_cover,is_day,uv_index,visibility,precipitation
  &hourly=temperature_2m,weather_code,precipitation_probability,apparent_temperature
  &daily=weather_code,temperature_2m_max,temperature_2m_min,
         sunrise,sunset,precipitation_probability_max,uv_index_max
  &forecast_days=7
```

---

## Data Flow

```
User searches for a city
        ↓
Geocoding API → latitude + longitude + timezone
        ↓
Weather Forecast API → current, hourly, daily data
        ↓
useWeather hook → maps raw response into app data structure
        ↓
Dashboard → renders all components with live data
```

---

## Colour Palette

| Name | Hex |
|---|---|
| Sky blue (accent) | `#0ea5e9` |
| Light sky | `#38bdf8` |
| Ice blue | `#e0f2fe` |
| Primary text | `#0f172a` |
| Secondary text | `#64748b` |
| Muted text | `#94a3b8` |
| Surface | `#ffffff` |
| Background | `#f0f7ff` |
| Border | `#e2e8f0` |

---

## Deployment

### Vercel (recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Drag and drop the build/ folder into Netlify's dashboard
# or connect your GitHub repository
```

---

## Checklist

- [x] Dashboard loads with default location (Ilorin, Nigeria)
- [x] City search works with suggestions
- [x] Selecting a city updates the full dashboard
- [x] Current temperature, condition and icon display correctly
- [x] Feels-like, humidity, wind, visibility, UV index display correctly
- [x] Hourly forecast scrolls and highlights current hour
- [x] Temperature chart renders real API data
- [x] 7-day forecast works with expandable rows
- [x] Sunrise and sunset display with animated sun path
- [x] Precipitation probability displays correctly
- [x] °C / °F conversion updates all measurements
- [x] Wind speed unit switching works
- [x] Saved locations persist across sessions
- [x] Loading skeletons show during fetch
- [x] API errors are handled with retry option
- [x] Empty search state handled
- [x] Fully responsive on desktop, tablet and mobile

---

## License

MIT — free to use and modify.

---

## Acknowledgements

- [Open-Meteo](https://open-meteo.com) — free, open-source weather API
- [Recharts](https://recharts.org) — composable charting library for React
- [Lucide React](https://lucide.dev) — clean, consistent icon set
