import styles from './slackMessageCustomizer.module.css';
import addIcon from '../../assets/AddIcon.svg';
import { messageToSend } from '../../constants/interface';
import { useState } from 'react';

const SlackMessageCustomizer = ({
  data,
  setData,
  handleSendMessage,
}: {
  data: Partial<messageToSend>;
  setData: React.Dispatch<React.SetStateAction<Partial<messageToSend>>>;
  handleSendMessage: () => Promise<void>;
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.headerRow}>
          <div className={styles.textContainer}>
            <div className={styles.headerText}>Customize the Slack message</div>
            <div className={styles.inlineGroup}>
              <div className={styles.subText}>
                Use Slack's markdown text formatting:
              </div>
              <div className={styles.inlineBox}>
                <div className={styles.exampleText}>*bold*</div>
              </div>
              <div className={styles.inlineBox}>
                <div className={styles.exampleText}>_italics_</div>
              </div>
              <div className={styles.inlineBox}>
                <div className={styles.exampleText}>
                  {'<https://example.com/|links>'}
                </div>
              </div>
            </div>
            <div className={styles.subText}>
              or click “Add data” button on the right
            </div>
          </div>
          <div className={styles.addButton}>
            <img src={addIcon} />
            <div className={styles.addButtonText}>Add data</div>
          </div>
        </div>
        <div className={styles.messageBox}>
          <textarea
            value={data.text}
            onChange={(e) => setData({ ...data, text: e.target.value })}
            className={styles.messageText}
            placeholder='Add the custom message that will be posted when someone submits a form to Webflow'
          ></textarea>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.inlineGroup}>
          <div className={styles.headerText}>Bot Name</div>
        </div>
        <div className={styles.inputBox}>
          <input
            value={data.bot_name}
            onChange={(e) => setData({ ...data, bot_name: e.target.value })}
            type='text'
            className={styles.inputText}
            placeholder='The name of the bot sending the message (defaults to Webflow)'
          />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.inlineGroup}>
          <div className={styles.headerText}>Add bot’s icon</div>
        </div>
        <div className={styles.inputBox}>
          <input
            value={data.icon_url}
            onChange={(e) => setData({ ...data, icon_url: e.target.value })}
            type='text'
            className={styles.inputText}
            placeholder='Add image URL'
          />
        </div>
      </div>
      <div className={styles.testRow}>
        <div className={styles.testTextContainer}>
          <div className={styles.headerText}>Run Test</div>
          <div className={styles.subText}>
            To ensure your setup is correct, please proceed with a run test.
          </div>
        </div>
        <div className={styles.runTestButton}>
          <div
            onClick={async () => {
              setLoading(true);
              await handleSendMessage();
              setLoading(false);
            }}
            className={styles.runTestButtonText}
          >
            {loading ? '...' : 'Run test'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlackMessageCustomizer;
