import { FC, Fragment } from 'react';

import useNotificationStore from '../../store/useNotificationStore';

import { NotificationType } from '../../utils/enums/notification';

import PopupSuccessIcon from '../../icons/toast/Success';

import './notification-popup.scss';
import PopupCloseIcon from '../../icons/toast/Close';

type NotificationItemProps = {
  type: NotificationType;
  title: string;
};
const NotificationItem: FC<NotificationItemProps> = ({ type, title }) => {
  const hideNotification = useNotificationStore().hideNotification;

  return (
    <section className="notification-popup__container">
      <div className="notification-popup__icon">
        <PopupSuccessIcon />
      </div>

      <p className="notification-popup__title">{title}</p>

      <div className="notification-popup__close" onClick={hideNotification}>
        <PopupCloseIcon />
      </div>
    </section>
  );
};

export default NotificationItem;
