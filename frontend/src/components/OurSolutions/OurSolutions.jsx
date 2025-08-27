import styles from "./OurSolutions.module.css";

export function OurSolutions() {
  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <img
          src="/OurSolImg.png"
          alt="Our Solutions"
          className={styles.image}
        />
      </div>
      <div className={styles.textWrapper}>
        <h1 className={styles.heading}>
          Why Work With <br className={styles.break} /> ByteShifted{" "}
          <span className={styles.highlight}>?</span>
        </h1>
        <p className={styles.paragraph}>
          At ByteShifted, we’re more than a tech company. We’re problem-solvers,
          builders, and dreamers who turn complex challenges into elegant
          digital solutions. If you’re ready to work on projects that matter,
          grow your skills, and be part of a team that’s redefining the limits
          of technology, your next chapter starts here.
        </p>
      </div>
    </div>
  );
}
