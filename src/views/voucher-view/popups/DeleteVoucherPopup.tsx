import { FC } from 'react';

import Popup from '../../../components/popup';
import Typography from '../../../components/typography';
import Button from '../../../components/button';

import CheckmarkIcon from '../../../icons/Checkmark';

import { ParagraphView, TitleView } from '../../../utils/enums/typography';
import { ButtonView } from '../../../utils/enums/button';

import styles from '../voucher-view.module.scss';

type DeleteVoucherPopupProps = {
  visible: boolean;
  onClose: () => void;
  onClick: () => void;
};
const DeleteVoucherPopup: FC<DeleteVoucherPopupProps> = ({
  visible,
  onClose,
  onClick
}) => {
  return (
    <Popup visible={visible} onClose={onClose}>
      <Typography.Title
        view={TitleView.medium}
        className={styles.voucher_view__delete_title}
        isCentered
      >
        Delete voucher
      </Typography.Title>

      <Typography.Paragraph
        view={ParagraphView.medium}
        className={styles.voucher_view__delete_subtitle}
        isCentered
      >
        Deleting is irreversible. Please review and confirm the action.
      </Typography.Paragraph>

      <section className={styles.voucher_view__delete_buttons}>
        <Button view={ButtonView.ghost} onClick={onClose}>
          Cancel
        </Button>

        <Button
          view={ButtonView.fullRed}
          LeftAddon={CheckmarkIcon}
          onClick={onClick}
        >
          Delete voucher
        </Button>
      </section>
    </Popup>
  );
};

export default DeleteVoucherPopup;