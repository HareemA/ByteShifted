import React from "react";
import styles from "./Hiring.module.css";

export function Hiring() {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>How we hire our team</h2>
      <div className={styles.row}>
        {/* col 1 */}
        <div className={`${styles.col} ${styles.col1}`}>
          <HiringCard
            title={"01"}
            heading={"Application and recruiter screen"}
          />
          <img src="hiring1.png" className={styles.image1} />
          <HiringCard title="03" heading={"Task or challenge"} />
        </div>

        {/* col 2 */}
        <div className={styles.col}>
          <div className={styles.col2Row}>
            <img src={"hiring2.png"} className={styles.image2} />
            <div className={styles.col2Inner}>
              <HiringCard title={"02"} heading={"First round interview"} />
              <img src="hiring3.png" className={styles.image3} />
            </div>
          </div>
          <div>
            <HiringCard title={"04"} heading={"Final Interview"} />
          </div>
        </div>
      </div>
    </div>
  );
}

const HiringCard = ({ title, heading }) => {
  const cardClass = title === "04" ? styles.cardLarge : styles.cardDefault;
  return (
    <div className={`${styles.card} ${cardClass}`}>
      <h2 className={styles.cardTitle}>{title}</h2>
      <p className={styles.cardHeading}>{heading}</p>
      <p className={styles.cardDesc}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua
      </p>
    </div>
  );
};
