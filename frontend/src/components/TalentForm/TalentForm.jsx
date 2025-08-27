import React from "react";
import styles from "./TalentForm.module.css";

export default function TalentForm() {
  return (
    <div className={styles.container}>
      {/* Background */}
      <img src="group2.png" alt="background" className={styles.bgImage} />

      {/* Card container */}
      <div className={styles.card}>
        {/* Character image */}
        <img src="man.png" alt="Character" className={styles.characterImg} />

        {/* Heading */}
        <h1 className={styles.heading}>
          Got Extraordinary <br />
          Talent<span className={styles.question}>?</span>
        </h1>

        <p className={styles.subtext}>
          Whether you're a mathematical prodigy, a visionary artist, tech expert
          or an AI pioneer.
          <br /> Tell us why you belong here, even if we’re not hiring.
        </p>

        {/* Form */}
        <form className={styles.form}>
          <div>
            <p className={styles.label}>
              You have 8 balls, one is heavier and you have a balance scale.
              What's the minimum number weighings needed to find it?
            </p>
            <input
              type="text"
              placeholder="Type your guess"
              className={styles.input}
            />
          </div>

          <div>
            <p className={styles.label}>
              Now tell us what makes you different?
            </p>
            <textarea
              placeholder="Explain your mathematical, visual, algorithmic, or AI excellence in detail."
              className={styles.textarea}
            />
          </div>

          <button type="submit" className={styles.button}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
