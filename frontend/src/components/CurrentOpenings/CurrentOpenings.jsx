import { BookmarkPlus, Locate, Timer, UserSearch } from "lucide-react";
import styles from "./CurrentOpenings.module.css";

export function CurrentOpenings() {
  const data = [
    {
      id: 1,
      date: "Posted 3rd Aug, 2025",
      title: "Creative Coordinator - Mid Level",
    },
    { id: 2, date: "Posted 3rd Aug, 2025", title: "IT Support Intern" },
    {
      id: 3,
      date: "Posted 3rd Aug, 2025",
      title: "Creative Coordinator - Mid Level",
    },
    { id: 4, date: "Posted 3rd Aug, 2025", title: "IT Support Intern" },
    {
      id: 5,
      date: "Posted 3rd Aug, 2025",
      title: "Creative Coordinator - Mid Level",
    },
    { id: 6, date: "Posted 3rd Aug, 2025", title: "IT Support Intern" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.bgOverlay}></div>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Current Openings</h2>
        <div className={styles.cardsWrapper}>
          {data.map((d) => (
            <Cards key={d.id} date={d.date} title={d.title} />
          ))}
        </div>
      </div>
    </div>
  );
}

const Cards = ({ date, title }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <p>{date}</p>
        <BookmarkPlus />
      </div>

      <div className={styles.cardTitleRow}>
        <img src="/logo_white.png" className={styles.cardLogo} />
        <p className={styles.cardTitle}>{title}</p>
      </div>

      <div className={styles.cardBottom}>
        <div className={styles.cardMeta}>
          <span className={styles.metaItem}>
            <Timer /> Full Time
          </span>
          <span className={styles.metaItem}>
            <Locate /> Remote
          </span>
          <span className={styles.metaItem}>
            <UserSearch /> Actively Looking
          </span>
        </div>
        <button className={styles.detailsButton}>Job details</button>
      </div>
    </div>
  );
};
