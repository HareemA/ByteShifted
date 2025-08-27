import styles from "./Special.module.css";

export function Special() {
  const data = [
    { heading: "90% Successful Projects", desc: "Proven Record IT Industry" },
    { heading: "97% Client Satisfaction", desc: "Proven Record IT Industry" },
    { heading: "100% Work Flexibility", desc: "Proven Record IT Industry" },
    { heading: "95% Career enhancement", desc: "Proven Record IT Industry" },
  ];

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.heading}>
          What makes <br />
          <span className={styles.highlight}>Byteshifted</span> Special?
        </h1>
      </div>

      <div className={styles.cardsWrapper}>
        {data.map((d) => (
          <Card key={d.heading} heading={d.heading} desc={d.desc} />
        ))}
      </div>
    </div>
  );
}

const Card = ({ heading, desc }) => {
  return (
    <div className={styles.card}>
      <h1 className={styles.cardHeading}>{heading}</h1>
      <p className={styles.cardDesc}>{desc}</p>
    </div>
  );
};
