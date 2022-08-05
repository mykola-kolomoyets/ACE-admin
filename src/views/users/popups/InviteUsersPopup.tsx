/* eslint-disable no-unused-vars */
import { ChangeEvent, FC } from 'react';

import Popup from '../../../components/popup';
import Typography from '../../../components/typography';
import Input from '../../../components/input';
import Radio from '../../../components/radio';
import Button from '../../../components/button';

import SendIcon from '../../../icons/Send';

import { InviteUsersFormValues } from '../../../utils/types/user';
import { ParagraphView, TitleView } from '../../../utils/enums/typography';
import { ButtonView } from '../../../utils/enums/button';

import { roleItems } from '../users.constants';

import styles from '../users.module.scss';

type InviteUsersPopupProps = {
  visible: boolean;
  onClose: () => void;
  onClick: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onUserRoleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  formValues: InviteUsersFormValues;
  formErrors: Pick<InviteUsersFormValues, 'emails'>;
};
const InviteUsersPopup: FC<InviteUsersPopupProps> = ({
  visible,
  onClose,
  formValues,
  onChange,
  formErrors,
  onUserRoleChange,
  onClick
}) => {
  return (
    <Popup visible={visible} onClose={onClose}>
      <Typography.Title
        view={TitleView.medium}
        className={styles.users__popup_title}
        isCentered
      >
        Invite a user
      </Typography.Title>

      <Typography.Paragraph
        view={ParagraphView.medium}
        className={styles.users__popup_subtitle}
        isCentered
      >
        Enter the email addresses of the users you'd like to invite, and choose
        the role they should have.
      </Typography.Paragraph>

      <section className={styles.users__popup_form}>
        <Input
          className={styles.users__popup_form_emails}
          name="emails"
          label="Email addresses"
          inputProps={{
            type: 'email',
            value: formValues.emails,
            onChange: onChange,
            placeholder: 'Enter email addresses'
          }}
          errorMessage={formErrors.emails}
        />

        <Radio
          items={roleItems}
          inputProps={{ onChange: onUserRoleChange }}
          value={formValues.role}
          label="User role"
        />

        <section className={styles.users__popup_form_buttons}>
          <Button view={ButtonView.ghost} onClick={onClose}>
            Cancel
          </Button>
          <Button
            view={ButtonView.primary}
            LeftAddon={SendIcon}
            onClick={onClick}
          >
            Send invitation
          </Button>
        </section>
      </section>
    </Popup>
  );
};

export default InviteUsersPopup;
