import styles from './formHeader.module.css';
import formConnectorIcon from '../../assets/formConnector.svg';
import closeIcon from '../../assets/closeIcon.svg';

const FormHeader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.flexRow}>
          <img src={formConnectorIcon} />
          <div className={styles.text}>Form Connector</div>
        </div>
        <img src={closeIcon} className={styles.closeIcon}/>
      </div>
    </div>
  );
};

export default FormHeader;
