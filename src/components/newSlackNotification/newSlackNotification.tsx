import addIcon from '../../assets/AddIcon.svg';
import styles from './newSlackNotification.module.css';

const NewSlackNotification = ({ onclick }: { onclick: () => void }) => {
  return (
    <div onClick={onclick} className={styles.notificationContainer}>
      <img src={addIcon} />
      <div className={styles.textContainer}>
        <div className={styles.text}>Add new Slack notification</div>
      </div>
    </div>
  );
};

export default NewSlackNotification;
