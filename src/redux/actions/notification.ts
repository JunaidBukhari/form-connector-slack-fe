import { notification } from '../../constants/interface';
import {
  removeNotification,
  saveNotification,
} from '../slices/notificationsSlice';
import { AppDispatch } from '../store/store';

export const handleRemoveNotification = (id: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(removeNotification(id));
  };
};
export const handleSaveNotification = (message: notification) => {
  return (dispatch: AppDispatch) => {
    dispatch(saveNotification(message));
  };
};
