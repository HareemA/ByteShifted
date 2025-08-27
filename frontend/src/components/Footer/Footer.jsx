import {
  HandHeart,
  Linkedin,
  Instagram,
  Mail,
  MessageCircle,
  Phone,
  Twitter,
  Copyright,
} from "lucide-react";

import styles from "./Footer.module.css";

export function Footer() {
  return (
    <div className={styles.container}>
      {/* Top Section */}
      <div className={styles.topSection}>
        {/* Consultation Info */}
        <div className={styles.consultationTop}>
          <h2 className={styles.consultationHeading}>
            Schedule a Free Consultation
          </h2>
          <p className={styles.consultationSub}>
            Or apply as a digital accessibility expert
          </p>
          <p className={styles.consultationNote}>
            <HandHeart />
            We are an accessible workplace. People with disabilities are welcome
            to apply.
          </p>
        </div>
        {/* Contact Form */}
        <form className={styles.form}>
          <p className={styles.formHeading}>Send us a Message</p>
          <input placeholder="Name" className={styles.input} />
          <input placeholder="Email" className={styles.input} />
          <input
            placeholder="How we can help you?"
            className={styles.textarea}
          />
          <button type="submit" className={styles.button}>
            Send
          </button>
        </form>

        {/* Consultation Info */}
        <div className={styles.consultationRight}>
          <h2 className={styles.consultationHeading}>
            Schedule a Free Consultation
          </h2>
          <p className={styles.consultationSub}>
            Or apply as a digital accessibility expert
          </p>
          <p className={styles.consultationNote}>
            <HandHeart />
            We are an accessible workplace. People with disabilities are welcome
            to apply.
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className={styles.bottomSection}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          <img src="logo.png" alt="logo" className={styles.logo} />

          <div className={styles.contactRow}>
            <Mail /> hello@byteshifted.com
          </div>
          <div className={styles.contactRow}>
            <Phone /> +45 60 47 52 64
          </div>

          <div className={styles.socials}>
            <Linkedin />
            <Instagram />
            <MessageCircle />
            <Twitter />
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider}></div>

        {/* Right Column */}
        <div className={styles.rightColumn}>
          <div className={styles.linksWrapper}>
            <div className={styles.linkGroup}>
              <h2 className={styles.linkHeading}>Company</h2>
              <p className={styles.link}>About Us</p>
              <p className={styles.link}>Careers</p>
              <p className={styles.link}>What We Do</p>
            </div>

            <div className={styles.linkGroup}>
              <h2 className={styles.linkHeading}>Resources</h2>
              <p className={styles.link}>Privacy Policy</p>
              <p className={styles.link}>Terms and Conditions</p>
              <p className={styles.link}>What We Do</p>
            </div>
          </div>

          <div className={styles.copy}>
            <Copyright /> 2025 ByteShifted. All Rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
