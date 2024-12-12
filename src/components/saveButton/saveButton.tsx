import styles from './saveButton.module.css';

const SaveButton = ({ onclick }: { onclick: () => void }) => {
  return (
    <div onClick={onclick} className={styles.saveButton}>
      <div className={styles.saveText}>Save</div>
    </div>
  );
};

export default SaveButton;
