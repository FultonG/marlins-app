import styles from "./SkeletonLoader.module.css";

const SkeletonLoader = () => {
  return (
    <div className={styles.skeletonTile}>
      <div className={styles.skeletonText}></div>
      <div className={styles.skeletonSubText}></div>
      <div className={styles.skeletonScore}></div>
      <div className={styles.skeletonText}></div>
    </div>
  );
};

export default SkeletonLoader;
