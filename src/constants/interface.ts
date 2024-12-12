export interface channel {
  id: string;
  name: string;
}
export interface messageToSend {
  channelId: string;
  text: string;
  block?: Block[];
  icon_url?: string;
  bot_name?: string;
}
export interface notification {
  id: string;
  channels: channel[]
  text?: string;
  block?: Block[];
  bot_name?: string;
  icon_url?: string;
}
export interface Block {
  type: string;
  text?: {
    type: string;
    text: string;
  };
}