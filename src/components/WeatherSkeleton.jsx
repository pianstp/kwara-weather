import styles from './WeatherSkeleton.module.css';

export default function WeatherSkeleton() {
  return (
    <div className={styles.wrap}>
      <div className={styles.main}>
        <div className={`${styles.bone} ${styles.city}`} />
        <div className={`${styles.bone} ${styles.region}`} />
        <div className={`${styles.bone} ${styles.temp}`} />
        <div className={`${styles.bone} ${styles.condition}`} />
      </div>
      <div className={styles.cards}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`${styles.bone} ${styles.card}`} />
        ))}
      </div>
      <div className={styles.hourly}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`${styles.bone} ${styles.hourItem}`} />
        ))}
      </div>
    </div>
  );
}
