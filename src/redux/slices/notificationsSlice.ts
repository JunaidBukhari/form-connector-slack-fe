import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notification } from '../../constants/interface';

export interface Notifications {
  notifications: notification[];
}

const initialState: Notifications = {
  notifications: [],
};

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    saveNotification: (state, action: PayloadAction<notification>) => {
      state.notifications = [
        ...state.notifications.filter((n) => n.id !== action.payload.id),
        action.payload,
      ];
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
  },
});

export const { saveNotification, removeNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
