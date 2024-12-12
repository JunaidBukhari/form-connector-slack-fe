import React, { useState } from 'react';
import styles from './slackChannelSelector.module.css';
import upIcon from '../../assets/ChevronUpIcon.svg';
import closeIcon from '../../assets/CloseIcon.svg';
import helpIcon from '../../assets/HelpIcon.svg';
import { useGetSlackChannels } from '../../api/slackChannels';
import { channel } from '../../constants/interface';

const SlackChannelSelector = ({
  selectedChannels,
  setSelectedChannels,
  handleDeleteNotification,
}: {
  selectedChannels: channel[];
  setSelectedChannels: React.Dispatch<React.SetStateAction<channel[]>>;
  handleDeleteNotification: () => void;
}) => {
  const [selectedNotification, setSelectedNotification] =
    useState<string>('All Submissions');

  const notificationOptions = [
    'All Submissions',
    'Successful Submissions',
    'Failed Submissions',
  ];

  const handleNotificationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedNotification(event.target.value);
  };

  const { data, isLoading } = useGetSlackChannels();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const requiredChannel = data?.find(
      (channel) => channel.id === event.target.value
    );
    if (requiredChannel) {
      setSelectedChannels([...(selectedChannels || []), requiredChannel]);
    }
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.headerTitle}>Select Slack Channels</div>
            <div className={styles.headerSubtitle}>
              Select the Slack channel where the message will be posted. You can
              select multiple channels.
            </div>
          </div>
          <div
            onClick={() => handleDeleteNotification()}
            className={styles.deleteNotification}
          >
            Delete Notification
          </div>
          <img src={upIcon} />
        </div>
        <div className={styles.selectionContainer}>
          <select value={''} onChange={handleChange}>
            <option value='' disabled>
              Select Slack Channel
            </option>
            {isLoading ? (
              <option value='' disabled>
                ...loading
              </option>
            ) : (
              data?.map((channel) => (
                <option key={channel.id} value={channel.id}>
                  {channel.name}
                </option>
              ))
            )}
          </select>
        </div>
        <div className={styles.selectedChannels}>
          {selectedChannels.map((channel) => (
            <div key={channel.id} className={styles.channelItem}>
              <div className={styles.channelIconInner} />
              <div className={styles.channelText}># {channel?.name}</div>
              <img
                src={closeIcon}
                onClick={() =>
                  setSelectedChannels(
                    selectedChannels.filter((c) => c.id !== channel.id)
                  )
                }
              />
            </div>
          ))}
        </div>
        <div className={styles.notificationsContainer}>
          <div className={styles.notificationsContent}>
            <div className={styles.notificationsHeader}>
              Send notification for:
            </div>
            <div className={styles.notificationOptions}>
              {notificationOptions.map((option) => (
                <div key={option} className={styles.notificationOption}>
                  <input
                    type='radio'
                    value={option}
                    checked={selectedNotification === option}
                    onChange={handleNotificationChange}
                    className={styles.radioInput}
                  />
                  <p>{option}</p>
                  <img src={helpIcon} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SlackChannelSelector;
