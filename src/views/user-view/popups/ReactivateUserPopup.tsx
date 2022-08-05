import { FC } from 'react';

import Popup from '../../../components/popup';
import Typography from '../../../components/typography';
import Button from '../../../components/button';

import CheckmarkIcon from '../../../icons/Checkmark';

import { ParagraphView, TitleView } from '../../../utils/enums/typography';
import { ButtonView } from '../../../utils/enums/button';

import styles from '../user-view.module.scss';

type ReactivateUserPopupProps = {
  visible: boolean;
  onClose: () => void;
  onClick: () => void;
};
const ReactivateUserPopup: FC<ReactivateUserPopupProps> = ({
  visible,
  onClose,
  onClick
}) => {
  return (
    <Popup visible={visible} onClose={onClose}>
      <Typography.Title view={TitleView.medium} isCentered>
        Re-activate user
      </Typography.Title>

      <Typography.Paragraph
        view={ParagraphView.small}
        className={styles.user_view__deactivate_subtitle}
        isCentered
      >
        Are you sure you want to re-activate current user?
      </Typography.Paragraph>

      <section className={styles.user_view__deactivate_buttons}>
        <Button view={ButtonView.ghost} onClick={onClose}>
          Cancel
        </Button>

        <Button
          view={ButtonView.primary}
          onClick={onClick}
          LeftAddon={CheckmarkIcon}
        >
          Re-activate user
        </Button>
      </section>
    </Popup>
  );
};

export default ReactivateUserPopup;