import React from "react";
import styles from "./userGuide.module.css";

const UserGuide: React.FC = () => {
  return (
    <div className={styles.userGuideContainer}>
      <div className={styles.userGuideInner}>
          <div className={styles.userGuideText}>First time user guide</div>
        <div>
          <span className={styles.userGuideInstruction}>For detailed instructions, please refer to our </span>
          <span className={styles.userGuideLink}>first time user guide</span>
        </div>
      </div>
    </div>
  );
};

export default UserGuide;