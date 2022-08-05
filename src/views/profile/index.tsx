/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useEffect, useMemo, useState } from 'react';

import useSummaryStore from '../../store/useSummaryStore';
import useProfileStore from '../../store/useProfileStore';
import useNavbarStore from '../../store/useNavbarStore';

import UserService from '../../api/services/user.service';
import AuthService from '../../api/services/auth.service';

import Button from '../../components/button';
import List from '../../components/list';
import { ListItemProps } from '../../components/list/list-item';
import Section from '../../components/section';
import Typography from '../../components/typography';
import Popup from '../../components/popup';
import Input from '../../components/input';

import EmailIcon from '../../icons/Email';
import CheckmarkIcon from '../../icons/Checkmark';

import { isEmail } from '../../utils/fn';
import { ListDirection, ListItemType } from '../../utils/enums/list';
import { TitleView, ParagraphView } from '../../utils/enums/typography';
import { ButtonView } from '../../utils/enums/button';
import { EditProfileInfo, EditProfilePassword } from '../../utils/types/user';

import styles from './profile.module.scss';
import { STATUS_CODES } from 'http';
import { StatusCodes } from 'http-status-codes';

export const defaultEditProfileInfoValues = {
  firstName: '',
  lastName: '',
  email: ''
};

export const defaultEditProfilePasswordValues = {
  currentPassword: '',
  newPassword: '',
  repeatedPassword: ''
};

export const defaultEditProfileInfoErrors = {
  firstName: '',
  lastName: '',
  email: ''
};

export const defaultEditProfilePasswordErrors = {
  currentPassword: '',
  newPassword: '',
  repeatedPassword: ''
};

const Profile = () => {
  /**
   * === STORES
   */
  const { openSummary } = useSummaryStore();
  const { firstName, lastName, email, updateProfileData } = useProfileStore();
  const { setActiveItem } = useNavbarStore();

  /**
   * === STATE
   */
  const [isEditProfileInfoOpen, setIsEditProfileInfoOpen] = useState(false);
  const [isEditProfilePasswordOpen, setIsEditProfilePasswordOpen] =
    useState(false);

  const [editProfileInfoValues, setEditProfileInfoValues] =
    useState<EditProfileInfo>(defaultEditProfileInfoValues);
  const [editProfilePasswordValues, setEditProfilePasswordValues] =
    useState<EditProfilePassword>(defaultEditProfilePasswordValues);

  const [editProfileInfoErrors, setEditProfileInfoErrors] =
    useState<EditProfileInfo>(defaultEditProfileInfoErrors);
  const [editProfilePasswordErrors, setEditProfilePasswordErrors] =
    useState<EditProfilePassword>(defaultEditProfilePasswordErrors);

  /**
   * === MEMOS
   */
  const profileInfoItems: ListItemProps[] = useMemo(
    () => [
      {
        type: ListItemType.string,
        label: 'First Name',
        value: firstName
      },
      {
        type: ListItemType.string,
        label: 'Last Name',
        value: lastName
      },
      {
        type: ListItemType.string,
        label: 'Email address',
        value: email
      }
    ],
    [firstName, lastName, email]
  );

  /**
   * === FUNCTIONS
   */
  const onFieldChange = (
    event: ChangeEvent<HTMLInputElement>,
    form: 'info' | 'password'
  ) => {
    const { name, value } = event.target;

    if (form === 'info') {
      setEditProfileInfoValues((prev) => ({ ...prev, [name]: value }));
      setEditProfileInfoErrors((prev) => ({ ...prev, [name]: '' }));
    }

    if (form === 'password') {
      setEditProfilePasswordValues((prev) => ({ ...prev, [name]: value }));
      setEditProfilePasswordErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // === EDIT PROFILE INFO

  const onEditProfileInfoOpen = () => setIsEditProfileInfoOpen(true);
  const onEditProfileInfoClose = () => setIsEditProfileInfoOpen(false);

  const validateProfileInfo = (cb: () => void) => {
    const editedValues = Object.values(editProfileInfoValues);
    const currentProfileData = [firstName, lastName, email];

    const isDataEqual = editedValues.every(
      (value, index) => value.trim() === currentProfileData[index].trim()
    );

    if (isDataEqual) {
      onEditProfileInfoClose();

      return openSummary({
        isSuccess: false,
        title: 'You did not change any data',
        subtitle:
          'Change some of personal information to update your profile data.'
      });
    }

    const [editedFirstName, editedLastName, editedEmail] = Object.values(
      editProfileInfoValues
    ).map((value) => value.trim());

    const errors = { ...defaultEditProfileInfoErrors };

    if (!editedEmail || !isEmail(editedEmail))
      errors.email = 'Enter valid email';
    if (!editedFirstName || editedFirstName.length < 3)
      errors.firstName = 'Enter valid first name';
    if (!editedLastName || editedLastName.length < 3)
      errors.lastName = 'Enter valid last name';

    if (Object.values(errors).some((error) => error.length))
      return setEditProfileInfoErrors(errors);

    cb();
  };

  const validateProfilePassword = (cb: () => void) => {
    const [currentPassword, newPassword, repeatedPassword] = Object.values(
      editProfilePasswordValues
    ).map((value) => value.trim());

    const errors = { ...defaultEditProfilePasswordErrors };

    if (!currentPassword)
      errors.currentPassword = 'Enter your current password';

    if (!newPassword) errors.newPassword = 'Enter your new password';

    if (newPassword.length < 7)
      errors.newPassword = 'Password has to be at least 7 characters long';

    if (!repeatedPassword)
      errors.repeatedPassword = 'Confirm your new password';

    if (repeatedPassword.length < 7)
      errors.repeatedPassword = 'Password has to be at least 7 characters long';

    const arePasswordsEqual =
      newPassword && repeatedPassword && newPassword === repeatedPassword;
    if (!arePasswordsEqual) errors.repeatedPassword = 'Passwords are not equal';

    if (Object.values(errors).some((error) => error.length))
      return setEditProfilePasswordErrors(errors);

    cb();
  };

  const onEditProfileInfoSubmit = () => {
    validateProfileInfo(() => {
      UserService.updateUser(editProfileInfoValues)
        .then((res) => {
          onEditProfileInfoClose();

          updateProfileData(editProfileInfoValues);

          openSummary({
            isSuccess: true,
            title: 'Personal information was successfully updated',
            subtitle: 'The data will update after next log in.'
          });
        })
        .catch((err) => {
          console.log(err);

          openSummary({
            isSuccess: false,
            title: 'Personal information was not updated',
            subtitle:
              'the error ocurred while updating your password. Please, try again later.'
          });
        });
    });
  };

  // === EDIT PROFILE PASSWORD

  const onEditProfilePasswordOpen = () => setIsEditProfilePasswordOpen(true);
  const onEditProfilePasswordClose = () => {
    setEditProfilePasswordValues(defaultEditProfilePasswordValues);
    setEditProfilePasswordErrors(defaultEditProfilePasswordErrors);

    setIsEditProfilePasswordOpen(false);
  };

  const onEditProfilePasswordSubmit = () => {
    validateProfilePassword(() => {
      AuthService.changePassword(
        editProfilePasswordValues.currentPassword,
        editProfilePasswordValues.newPassword
      )
        .then((res) => {
          openSummary({
            isSuccess: true,
            title: 'Personal password was successfully updated'
          });
          onEditProfilePasswordClose();
        })
        .catch((err) => {
          console.log(err);

          if (err.response.status === StatusCodes.UNAUTHORIZED) {
            return setEditProfilePasswordErrors((prev) => ({
              ...prev,
              currentPassword: 'Invalid password'
            }));
          }

          if (err.response.status === StatusCodes.UNPROCESSABLE_ENTITY) {
            return setEditProfilePasswordErrors((prev) => ({
              ...prev,
              newPassword: err.response.data.message
            }));
          }

          openSummary({
            isSuccess: false,
            title: 'Password was not updated',
            subtitle:
              'the error ocurred while updating your password. Please, try again later.'
          });
          onEditProfilePasswordClose();
        });
    });
  };

  /**
   * === EFFECTS
   */
  useEffect(() => {
    setActiveItem(null);
  }, []);

  useEffect(() => {
    setEditProfileInfoValues({ firstName, lastName, email });
  }, [firstName, lastName, email]);

  return (
    <section className={styles.profile}>
      <Popup visible={isEditProfileInfoOpen} onClose={onEditProfileInfoClose}>
        <Typography.Title
          view={TitleView.medium}
          className={styles.profile__edit_info_form_title}
          isCentered
        >
          Edit personal information
        </Typography.Title>

        <Typography.Paragraph
          view={ParagraphView.small}
          className={styles.profile__edit_info_form_subtitle}
          isCentered
        >
          Editing your email address will require you verify it.
        </Typography.Paragraph>

        <section className={styles.profile__edit_info_form_form}>
          <Input
            className={styles.profile__edit_info_form_first_name}
            name="firstName"
            label="First name"
            inputProps={{
              type: 'text',
              value: editProfileInfoValues.firstName,
              onChange: (event) => onFieldChange(event, 'info'),
              placeholder: 'Enter first name'
            }}
            errorMessage={editProfileInfoErrors.firstName}
          />

          <Input
            className={styles.profile__edit_info_form_last_name}
            name="lastName"
            label="Last name"
            inputProps={{
              type: 'text',
              value: editProfileInfoValues.lastName,
              onChange: (event) => onFieldChange(event, 'info'),
              placeholder: 'Enter last name'
            }}
            errorMessage={editProfileInfoErrors.lastName}
          />

          <Input
            className={styles.profile__edit_info_form_email}
            name="email"
            label="Email addresses"
            Icon={EmailIcon}
            inputProps={{
              type: 'email',
              value: editProfileInfoValues.email,
              onChange: (event) => onFieldChange(event, 'info'),
              placeholder: 'Enter email address'
            }}
            errorMessage={editProfileInfoErrors.email}
          />

          <section className={styles.profile__edit_info_form_buttons}>
            <Button view={ButtonView.ghost} onClick={onEditProfileInfoClose}>
              Cancel
            </Button>
            <Button
              view={ButtonView.primary}
              LeftAddon={CheckmarkIcon}
              onClick={onEditProfileInfoSubmit}
            >
              Save changes
            </Button>
          </section>
        </section>
      </Popup>

      <Popup
        visible={isEditProfilePasswordOpen}
        onClose={onEditProfilePasswordClose}
      >
        <Typography.Title
          view={TitleView.medium}
          className={styles.profile__edit_password_form_title}
          isCentered
        >
          Edit personal information
        </Typography.Title>

        <Typography.Paragraph
          view={ParagraphView.small}
          className={styles.profile__edit_password_form_subtitle}
          isCentered
        >
          Please enter your current and new passwords.
        </Typography.Paragraph>

        <section className={styles.profile__edit_password_form_form}>
          <Input
            className={styles.profile__edit_password_form_first_name}
            name="currentPassword"
            label="Current password"
            inputProps={{
              type: 'password',
              value: editProfilePasswordValues.currentPassword,
              onChange: (event) => onFieldChange(event, 'password'),
              placeholder: 'Enter current password'
            }}
            errorMessage={editProfilePasswordErrors.currentPassword}
          />

          <Input
            className={styles.profile__edit_password_form_last_name}
            name="newPassword"
            label="New password"
            inputProps={{
              type: 'password',
              value: editProfilePasswordValues.newPassword,
              onChange: (event) => onFieldChange(event, 'password'),
              placeholder: 'Enter new password'
            }}
            errorMessage={editProfilePasswordErrors.newPassword}
          />

          <Input
            className={styles.profile__edit_password_form_email}
            name="repeatedPassword"
            label="Repeat new password"
            inputProps={{
              type: 'password',
              value: editProfilePasswordValues.repeatedPassword,
              onChange: (event) => onFieldChange(event, 'password'),
              placeholder: 'Repeat new password'
            }}
            errorMessage={editProfilePasswordErrors.repeatedPassword}
          />

          <section className={styles.profile__edit_password_form_buttons}>
            <Button
              view={ButtonView.ghost}
              onClick={onEditProfilePasswordClose}
            >
              Cancel
            </Button>

            <Button
              view={ButtonView.primary}
              LeftAddon={CheckmarkIcon}
              onClick={onEditProfilePasswordSubmit}
            >
              Save new password
            </Button>
          </section>
        </section>
      </Popup>

      <Typography.Title
        view={TitleView.medium}
        className={styles.profile__title}
      >
        My account
      </Typography.Title>

      <Section className={styles.profile__info}>
        <Typography.Title
          view={TitleView.small}
          className={styles.profile__info_title}
        >
          Personal information
        </Typography.Title>

        <List
          className={styles.profile__info_list}
          items={profileInfoItems}
          direction={ListDirection.horizontal}
        />

        <section className={styles.profile__info_buttons}>
          <Button view={ButtonView.ghost} onClick={onEditProfileInfoOpen}>
            Edit personal information
          </Button>

          <Button view={ButtonView.ghost} onClick={onEditProfilePasswordOpen}>
            Change password
          </Button>
        </section>
      </Section>
    </section>
  );
};

export default Profile;
