import styles from "./Header.module.css";

export function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.textSection}>
        <h1 className={styles.heading}>
          Build the future.
          <br />
          Shape your <span className={styles.highlight}>Career.</span>
        </h1>

        <div className={styles.imageWrapperSmall}>
          <img src="header-img.png" alt="Header" />
        </div>

        <div className={styles.buttonWrapperLarge}>
          <div className={styles.searchWrapper}>
            <input
              className={styles.input}
              placeholder="Select by Job title or category"
            />
            <button className={styles.searchBtn}>Search Job</button>
          </div>
          <div>
            <button className={styles.openingsBtn}>
              View Current Openings
            </button>
          </div>
        </div>
      </div>

      <div className={styles.spiralImage}>
        <img src="spiral.png" alt="Spiral" />
      </div>

      <div className={styles.dotImage}>
        <img src="dot.png" alt="Dot" />
      </div>

      <div className={styles.imageWrapper}>
        <img src="header-img.png" alt="Header" />
      </div>

      <div className={styles.buttonWrapperSmall}>
        <div className={styles.searchWrapper}>
          <input
            className={styles.input}
            placeholder="Select by Job title or category"
          />
          <button className={styles.searchBtn}>Search Job</button>
        </div>
        <div>
          <button className={styles.openingsBtn}>View Current Openings</button>
        </div>
      </div>
    </div>
  );
}
