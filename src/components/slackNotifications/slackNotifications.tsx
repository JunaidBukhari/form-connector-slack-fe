import React from 'react';
import slackIcon from '../../assets/slackIcon.svg';
import playIcon from '../../assets/playIcon.svg';
import styles from './slackNotifications.module.css';

const SlackNotifications: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.notificationInfo}>
        <div className={styles.iconContainer}>
          <img src={slackIcon} />
        </div>
        <div className={styles.text}>Slack Notifications</div>
      </div>
      <div className={styles.tutorialButton}>
        <img src={playIcon} />
        <div className={styles.buttonText}>Tutorial</div>
      </div>
    </div>
  );
};

export default SlackNotifications;
