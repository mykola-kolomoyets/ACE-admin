import { FC } from 'react';

import Popup from '../../../components/popup';
import Typography from '../../../components/typography';
import Button from '../../../components/button';
import CheckmarkIcon from '../../../icons/Checkmark';

import { ParagraphView, TitleView } from '../../../utils/enums/typography';
import { ButtonView } from '../../../utils/enums/button';

import styles from '../user-view.module.scss';

type DeleteUserPopupProps = {
  visible: boolean;
  onClose: () => void;
  onClick: () => void;
};
const DeleteUserPopup: FC<DeleteUserPopupProps> = ({
  visible,
  onClose,
  onClick
}) => {
  return (
    <Popup visible={visible} onClose={onClose}>
      <Typography.Title view={TitleView.medium} isCentered>
        Delete user
      </Typography.Title>

      <Typography.Paragraph
        view={ParagraphView.small}
        className={styles.user_view__delete_subtitle}
        isCentered
      >
        Deleting is irreversible. Please review and confirm the action.
      </Typography.Paragraph>

      <section className={styles.user_view__delete_buttons}>
        <Button view={ButtonView.ghost} onClick={onClose}>
          Cancel
        </Button>

        <Button
          view={ButtonView.fullRed}
          onClick={onClick}
          LeftAddon={CheckmarkIcon}
        >
          Delete user
        </Button>
      </section>
    </Popup>
  );
};

export default DeleteUserPopup;