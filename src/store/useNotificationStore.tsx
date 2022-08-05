import create from 'zustand';

import { NotificationType } from '../utils/enums/notification';
import toast from 'react-hot-toast';
import NotificationPopup from '../components/notification-popup';

interface NotificationStore {
  notificationId: string;

  showNotification: (type: NotificationType, title: string) => void;
  hideNotification: () => void;
}

const initialState: Omit<
  NotificationStore,
  'hideNotification' | 'showNotification'
> = {
  notificationId: ''
};

const useNotificationStore = create<NotificationStore>((set, get) => ({
  ...initialState,

  showNotification: (type: NotificationType, title: string) => {
    const notificationId = toast(<NotificationPopup {...{ type, title }} />);

    set({ notificationId });
  },

  hideNotification: () => {
    toast.dismiss(get().notificationId);
    set({ notificationId: '' });
  }
}));

export default useNotificationStore;
