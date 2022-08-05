import { FC } from 'react';

import Popup from '../../../components/popup';
import Typography from '../../../components/typography';
import List from '../../../components/list';
import Button from '../../../components/button';
import { ListItemProps } from '../../../components/list/list-item';

import CheckmarkIcon from '../../../icons/Checkmark';

import { ParagraphView, TitleView } from '../../../utils/enums/typography';
import { ListDirection } from '../../../utils/enums/list';
import { ButtonView } from '../../../utils/enums/button';

import styles from '../user-view.module.scss';

type DeactivateUserPopupProps = {
  visible: boolean;
  onClose: () => void;
  items: ListItemProps[];
  onClick: () => void;
};

const DeactivateUserPopup: FC<DeactivateUserPopupProps> = ({
  visible,
  onClose,
  items,
  onClick
}) => {
  return (
    <Popup visible={visible} onClose={onClose}>
      <Typography.Title view={TitleView.medium} isCentered>
        Deactivate user
      </Typography.Title>

      <Typography.Paragraph
        view={ParagraphView.small}
        className={styles.user_view__deactivate_subtitle}
        isCentered
      >
        Deactivating a user will burn all tokens in the wallet and the user
        shall be reimbursed. Please review and confirm the action.
      </Typography.Paragraph>

      <List items={items} direction={ListDirection.vertical} />

      <section className={styles.user_view__deactivate_buttons}>
        <Button view={ButtonView.ghost} onClick={onClose}>
          Cancel
        </Button>

        <Button
          view={ButtonView.fullRed}
          onClick={onClick}
          LeftAddon={CheckmarkIcon}
        >
          Burn tokens and deactivate
        </Button>
      </section>
    </Popup>
  );
};

export default DeactivateUserPopup;
