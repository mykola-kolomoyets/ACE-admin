import { ChangeEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import AuthService from '../../api/services/auth.service';

import Button from '../../components/button';
import Input from '../../components/input';
import Typography from '../../components/typography';
import Section from './../../components/section';

import KeyIcon from '../../icons/Key';

import {
  ParagraphColor,
  ParagraphView,
  TitleView
} from '../../utils/enums/typography';
import { authPaths } from '../../utils/paths';
import { ButtonView } from '../../utils/enums/button';

import styles from './change-password.module.scss';

export type ChangePasswordFormValues = {
  newPassword: string;
  confirmedPassword: string;
};

const defaultChangePasswordFormValues: ChangePasswordFormValues = {
  newPassword: '',
  confirmedPassword: ''
};

const defaultChangePasswordFormErrors: ChangePasswordFormValues = {
  newPassword: '',
  confirmedPassword: ''
};

const Login = () => {
  const { token } = useParams<'token'>();

  const [changePasswordValues, setChangePasswordValues] =
    useState<ChangePasswordFormValues>(defaultChangePasswordFormValues);

  const [changePasswordErrors, setChangePasswordErrors] =
    useState<ChangePasswordFormValues>(defaultChangePasswordFormErrors);

  const navigate = useNavigate();

  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setChangePasswordValues((prev) => ({ ...prev, [name]: value }));
  };

  const onForgotPasswordSubmit = () => {
    const { newPassword, confirmedPassword } = Object.fromEntries(
      Object.entries(changePasswordValues).map(([name, value]) => [
        name,
        value.trim()
      ])
    );

    if (!newPassword)
      return setChangePasswordErrors((prev) => ({
        ...prev,
        newPassword: 'Required!'
      }));

    if (!confirmedPassword)
      return setChangePasswordErrors((prev) => ({
        ...prev,
        confirmedPassword: 'Required!'
      }));

    if (newPassword && confirmedPassword && newPassword !== confirmedPassword)
      return setChangePasswordErrors((prev) => ({
        ...prev,
        confirmedPassword: 'Passwords have to be equal!!'
      }));

    AuthService.changePassword(confirmedPassword, token)
      .then((res) => {
        navigate(`${authPaths.main}${authPaths.login}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <main className={styles.change__container}>
      <section className={styles.change__content}>
        <Section className={styles.change__form}>
          <Typography.Title
            view={TitleView.medium}
            className={styles.change__title}
            isCentered
          >
            Choose your password
          </Typography.Title>

          <Typography.Paragraph
            view={ParagraphView.medium}
            color={ParagraphColor.gray}
            isCentered
            className={styles.change__subtitle}
          >
            Please set up a password for your account.
          </Typography.Paragraph>

          <Input
            className={styles.change__new_password}
            name="newPassword"
            label="Your new password"
            errorMessage={changePasswordErrors.newPassword}
            Icon={KeyIcon}
            inputProps={{
              type: 'password',
              value: changePasswordValues.newPassword,
              onChange: onFieldChange,
              placeholder: 'Enter your new password'
            }}
          />

          <Input
            className={styles.change__confirmed_password}
            name="confirmedPassword"
            label="Repeat your password"
            errorMessage={changePasswordErrors.confirmedPassword}
            Icon={KeyIcon}
            inputProps={{
              type: 'password',
              value: changePasswordValues.confirmedPassword,
              onChange: onFieldChange,
              placeholder: 'Confirm your new password'
            }}
          />

          <section className={styles.change__buttons}>
            <Button view={ButtonView.primary} onClick={onForgotPasswordSubmit}>
              Confirm new password
            </Button>
          </section>
        </Section>
      </section>
    </main>
  );
};

export default Login;
