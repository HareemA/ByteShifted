import styles from "./Connected.module.css";

export function Connected() {
  return (
    <div className={styles.container}>
      {/* Heading + Text */}
      <div className={styles.row}>
        <div className={styles.headingWrapper}>
          <h1 className={styles.heading}>
            Always <span className={styles.highlight}>Connected,</span>
            <br /> Wherever We Are!
          </h1>
        </div>
        <div className={styles.textBox}>
          <p className={styles.text}>
            At ByteShifted, location is never a barrier to collaboration.
            Whether we’re coding from a bustling city café, designing from a
            quiet home office, or managing projects across time zones, we work
            as one seamless team.
            <br />
            <br /> Our shared tools, transparent communication, and open culture
            keep us aligned, inspired, and moving forward — together.
          </p>
        </div>
      </div>

      {/* Images */}
      <div className={styles.imageWrapper}>
        <img src="group2.png" className={styles.bgBlur} />
        <img src="group.png" className={styles.fgImage} />
      </div>
    </div>
  );
}
