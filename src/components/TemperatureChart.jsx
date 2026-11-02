import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ReferenceLine,
} from 'recharts';
import { formatHour } from '../utils/formatTime';
import { formatTempValue } from '../utils/formatTemperature';
import { useSettings } from '../context/SettingsContext';
import styles from './TemperatureChart.module.css';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipTime}>{label}</p>
      <p className={styles.tooltipTemp}>{payload[0].value}°</p>
    </div>
  );
}

export default function TemperatureChart({ hourly, currentIndex, timezone }) {
  const { settings } = useSettings();
  const slice = hourly.slice(Math.max(0, currentIndex - 2), currentIndex + 22);

  const data = slice.map((h) => ({
    time: formatHour(h.time, timezone, settings.use24h),
    temp: formatTempValue(h.temperature, settings.tempUnit),
  }));

  const currentLabel = data[Math.min(2, data.length - 1)]?.time;

  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>Temperature Trend</h2>
      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height={150}>
          <AreaChart data={data} margin={{ top: 10, right: 16, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              dataKey="time"
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              interval={3}
            />
            <YAxis
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}°`}
            />
            <Tooltip content={<CustomTooltip />} />
            {currentLabel && (
              <ReferenceLine x={currentLabel} stroke="#0ea5e9" strokeDasharray="4 4" strokeWidth={1.5} />
            )}
            <Area
              type="monotone"
              dataKey="temp"
              stroke="#0ea5e9"
              strokeWidth={2}
              fill="url(#tempGrad)"
              dot={false}
              activeDot={{ r: 4, fill: '#0ea5e9', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
