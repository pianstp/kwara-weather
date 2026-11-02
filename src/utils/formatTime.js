export function formatTime(isoString, timezone, use24h = false) {
  try {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: !use24h,
      timeZone: timezone,
    });
  } catch {
    return isoString;
  }
}

export function formatHour(isoString, timezone, use24h = false) {
  try {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: !use24h,
      timeZone: timezone,
    });
  } catch {
    return '';
  }
}

export function formatDate(isoString, timezone) {
  try {
    const date = new Date(isoString + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      timeZone: timezone,
    });
  } catch {
    return isoString;
  }
}

export function formatDayShort(isoString) {
  try {
    const date = new Date(isoString + 'T00:00:00');
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  } catch {
    return '';
  }
}

export function formatDateShort(isoString) {
  try {
    const date = new Date(isoString + 'T00:00:00');
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch {
    return '';
  }
}

export function getDaylightDuration(sunrise, sunset) {
  const rise = new Date(sunrise);
  const set = new Date(sunset);
  const diff = Math.round((set - rise) / 60000);
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  return `${h}h ${m}m`;
}

export function getCurrentLocalTime(timezone, use24h = false) {
  return new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: !use24h,
    timeZone: timezone,
  });
}

export function getCurrentLocalDate(timezone) {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: timezone,
  });
}
