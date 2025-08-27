import styles from "./LifeAtByteShifted.module.css";

export function LifeAtByteShifted() {
  const icons = [
    { id: 1, img: "/icon1.png", text: "Work on Real-World Impact Projects" },
    { id: 2, img: "/icon2.png", text: "Continuous Skill Growth" },
    { id: 3, img: "/icon3.png", text: "Live and Work Anywhere" },
    { id: 4, img: "/icon4.png", text: "Collaborative, No-Bureaucracy Culture" },
    { id: 5, img: "/icon5.png", text: "Flexible Work Environment" },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        Life at <br className={styles.break} />
        <span className={styles.highlight}>Byteshifted</span>
      </h1>

      <div className={styles.divider} />

      <div className={styles.iconsWrapper}>
        {icons.map((icon) => (
          <div key={icon.id} className={styles.iconCard}>
            <img src={icon.img} className={styles.iconImage} />
            <p className={styles.iconText}>{icon.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
