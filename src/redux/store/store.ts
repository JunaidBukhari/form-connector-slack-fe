import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import notificationSlice from '../slices/notificationsSlice';

const notificationsPersistConfig = {
  key: 'notifications',
  storage,
};

const persistedNotificationsReducer = persistReducer(
  notificationsPersistConfig,
  notificationSlice
);

export const store = configureStore({
  reducer: {
    notifications: persistedNotificationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
