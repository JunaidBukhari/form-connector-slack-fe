import FormHeader from '../formHeader/formHeader';
import SlackMessageForm from '../slackMessageForm/slackMessageForm';
import SlackNotifications from '../slackNotifications/slackNotifications';
import UserGuide from '../userGuide/userGuide';
import styles from './form.module.css';
import { useAppSelector } from '../../hooks/storeHooks';

const Form = () => {
  const notifications = useAppSelector(
    (state) => state.notifications.notifications
  );
  return (
    <div className={styles.mainContainer}>
      <FormHeader />
      <div className={styles.formContainer}>
        <div className={styles.container}>
          <SlackNotifications />
          {notifications.length ? (
            notifications.map((notification, index) => (
              <SlackMessageForm
                key={notification.id}
                notification={notification}
                isLast={index === notifications.length - 1}
              />
            ))
          ) : (
            <SlackMessageForm isLast={true} />
          )}
        </div>
      </div>
      <UserGuide />
    </div>
  );
};

export default Form;
