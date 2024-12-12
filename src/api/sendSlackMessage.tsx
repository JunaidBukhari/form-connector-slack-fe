import axios from 'axios';
import { environment } from '../constants/environment';
import { Block } from '../constants/interface';

export const sendSlackMessage = async (
  channelId: string,
  text: string,
  icon_url?: string,
  bot_name?: string,
  block?: Block[]
) => {
  await axios.post(
    `${environment.VITE_SLACK_API_ENDPOINT}/message`,
    {
      channelId,
      text,
      icon_url,
      bot_name,
      block,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${environment.VITE_SLACK_TOKEN}`,
      },
    }
  );
};
