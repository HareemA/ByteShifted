import { Menu } from "lucide-react";
import styles from "./Navbar.module.css";

export function Navbar() {
  const navOptions = [
    "Our Work",
    "Services",
    "Solutions",
    "About Us",
    "Careers",
  ];

  return (
    <div className={styles.navbar}>
      <div>
        <img src="/logo.png" className={styles.navbarLogoImg} alt="Logo" />
      </div>
      <div className={styles.navbarLinks}>
        {navOptions.map((opts) => (
          <p key={opts} className={styles.navbarLink}>
            {opts}
          </p>
        ))}
      </div>
      <div className={styles.hamburger}>
        <Menu />
      </div>
    </div>
  );
}
