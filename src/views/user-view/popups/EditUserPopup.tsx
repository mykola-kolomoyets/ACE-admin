import { ChangeEvent, FC } from 'react';

import { Option } from '../../../components/select';
import Popup from '../../../components/popup';
import Typography from '../../../components/typography';
import Input from '../../../components/input';
import Radio from '../../../components/radio';
import Button from '../../../components/button';

import CheckmarkIcon from '../../../icons/Checkmark';
import EmailIcon from '../../../icons/Email';

import { EditUserErrors, EditUserValues } from '../../../utils/types/user';
import { ParagraphView, TitleView } from '../../../utils/enums/typography';
import { ButtonView } from '../../../utils/enums/button';

import styles from '../user-view.module.scss';

type EditUserPopupProps = {
  visible: boolean;
  onClose: () => void;
  onClick: () => void;
  editUserValues: EditUserValues;
  editUserErrors: EditUserErrors;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onUserRoleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  items: Option[];
};
const EditUserPopup: FC<EditUserPopupProps> = ({
  visible,
  onClose,
  editUserValues,
  onChange,
  editUserErrors,
  items,
  onUserRoleChange,
  onClick
}) => {
  return (
    <Popup visible={visible} onClose={onClose}>
      <Typography.Title
        view={TitleView.medium}
        className={styles.user_view__edit_form_title}
        isCentered
      >
        Edit user
      </Typography.Title>

      <Typography.Paragraph
        view={ParagraphView.small}
        className={styles.user_view__edit_form_subtitle}
        isCentered
      >
        Update user information or role below.
      </Typography.Paragraph>

      <section className={styles.user_view__edit_form}>
        <Input
          className={styles.user_view__edit_form_first_name}
          name="firstName"
          label="First name"
          inputProps={{
            type: 'text',
            value: editUserValues.firstName,
            onChange: onChange,
            placeholder: 'Enter first name'
          }}
          errorMessage={editUserErrors.firstName}
        />

        <Input
          className={styles.user_view__edit_form_last_name}
          name="lastName"
          label="Last name"
          inputProps={{
            type: 'text',
            value: editUserValues.lastName,
            onChange: onChange,
            placeholder: 'Enter last name'
          }}
          errorMessage={editUserErrors.lastName}
        />

        <Input
          className={styles.user_view__edit_form_emails}
          name="email"
          label="Email addresses"
          Icon={EmailIcon}
          inputProps={{
            type: 'email',
            value: editUserValues.email,
            onChange: onChange,
            placeholder: 'Enter email address'
          }}
          errorMessage={editUserErrors.email}
        />

        <Radio
          items={items}
          inputProps={{ onChange: onUserRoleChange }}
          value={editUserValues.role}
          label="User role"
          name="role"
        />

        <section className={styles.user_view__edit_form_buttons}>
          <Button view={ButtonView.ghost} onClick={onClose}>
            Cancel
          </Button>
          <Button
            view={ButtonView.primary}
            LeftAddon={CheckmarkIcon}
            onClick={onClick}
          >
            Save changes
          </Button>
        </section>
      </section>
    </Popup>
  );
};

export default EditUserPopup;