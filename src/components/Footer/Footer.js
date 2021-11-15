import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={`${styles.footerOuter}`}>
      <div className="flex flex-col items-center container">
        <Link to="/" className={`h-full ${styles.logoContainer}`}>
          <span className={styles.logoText}>Acoustica Shop</span>
        </Link>
        <span className={`${styles.subtitle}`}>
          by&nbsp;&nbsp;
          <a
            className={`${styles.username}`}
            target="_blank"
            rel="noreferrer"
            href="https://twitter.com/saikarthikp"
          >
            @SaiKarthikP
          </a>
        </span>
      </div>
    </div>
  );
}
