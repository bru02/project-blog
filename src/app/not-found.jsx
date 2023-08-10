import styles from './homepage.module.css';

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>
        404 Not Found
      </h1>
      <p>
        This page does not exist. Please check the URL
        & try again.
      </p>
    </div>
  );
}
