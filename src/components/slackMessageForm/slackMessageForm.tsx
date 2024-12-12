import { useState } from 'react';
import {
  channel,
  messageToSend,
  notification,
} from '../../constants/interface';
import SlackChannelSelector from '../slackChannelSelector/slackChannelSelector';
import SlackMessageCustomizer from '../slackMessageCustomizer/slackMessageCustomizer';
import styles from './slackMessageForm.module.css';
import { useAppDispatch } from '../../hooks/storeHooks';
import {
  handleRemoveNotification,
  handleSaveNotification,
} from '../../redux/actions/notification';
import NewSlackNotification from '../newSlackNotification/newSlackNotification';
import { sendSlackMessage } from '../../api/sendSlackMessage';
import SaveButton from '../saveButton/saveButton';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

const initialDataState = { block: [], text: '', icon_url: '', bot_name: '' };

const SlackMessageForm = ({
  notification,
  isLast,
}: {
  notification?: notification;
  isLast: boolean;
}) => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<Partial<messageToSend>>(
    notification
      ? {
          block: notification.block,
          text: notification.text,
          icon_url: notification.icon_url,
          bot_name: notification.bot_name,
        }
      : initialDataState
  );
  const [selectedChannels, setSelectedChannels] = useState<channel[]>(
    notification?.channels || []
  );

  const handleSendMessage = async () => {
    const promises = selectedChannels.map(async (channel) => {
      await sendSlackMessage(
        channel.id,
        data.text || '',
        data.icon_url,
        data.bot_name,
        data.block
      );
    });
    try {
      await Promise.all(promises);
      toast.success('Notification send successfully');
    } catch (error) {
      toast.error('There was an error sending notifications.');
    }
  };

  const handleSaveOrAdd = (isNew?: boolean) => {
    const uniqueId = uuidv4();
    const dataToSave = {
      channels: selectedChannels,
      text: data.text,
      block: data.block,
      bot_name: data.bot_name,
      icon_url: data.icon_url,
    };
    if (!dataToSave.channels.length || !dataToSave.text) {
      toast('Please complete the notification configuration');
      return;
    }
    if (notification && !isNew) {
      dispatch(
        handleSaveNotification({
          id: notification.id,
          ...dataToSave,
        })
      );
    } else {
      dispatch(
        handleSaveNotification({
          id: uniqueId,
          channels: [],
          text: '',
          block: [],
          bot_name: '',
          icon_url: '',
        })
      );
    }
  };

  return (
    <>
      <div className={styles.messageFormContainer}>
        <SlackChannelSelector
          selectedChannels={selectedChannels}
          setSelectedChannels={setSelectedChannels}
          handleDeleteNotification={() => {
            if (notification?.id) {
              dispatch(handleRemoveNotification(notification.id));
            } else {
              setData(initialDataState);
              setSelectedChannels([]);
            }
          }}
        />
        <SlackMessageCustomizer
          data={data}
          setData={setData}
          handleSendMessage={async () => handleSendMessage()}
        />
      </div>
      {isLast && (
        <>
          <NewSlackNotification onclick={() => handleSaveOrAdd(true)} />
          <div className={styles.container}>
            <SaveButton onclick={handleSaveOrAdd} />
          </div>
        </>
      )}
    </>
  );
};

export default SlackMessageForm;
