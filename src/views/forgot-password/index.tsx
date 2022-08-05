import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthService from '../../api/services/auth.service';

import Button from '../../components/button';
import Input from '../../components/input';
import Typography from '../../components/typography';
import Section from './../../components/section';

import SendIcon from '../../icons/Send';
import ArrowLeftIcon from '../../icons/ArrowLeft';
import EmailIcon from '../../icons/Email';

import {
  TitleView,
  ParagraphView,
  ParagraphColor
} from '../../utils/enums/typography';
import { authPaths } from '../../utils/paths';
import { isEmail } from '../../utils/fn';
import { ButtonView } from '../../utils/enums/button';

import styles from './forgot-password.module.scss';

export type ForgotPasswordFormValues = {
  email: string;
};

const defaultForgotPasswordFormValues: ForgotPasswordFormValues = {
  email: ''
};

const defaultForgotPasswordFormErrors: ForgotPasswordFormValues = {
  email: ''
};

const Login = () => {
  const [forgotPasswordValues, setForgotPasswordValues] =
    useState<ForgotPasswordFormValues>(defaultForgotPasswordFormValues);

  const [forgotPasswordErrors, setForgotPasswordErrors] =
    useState<ForgotPasswordFormValues>(defaultForgotPasswordFormErrors);

  const navigate = useNavigate();

  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForgotPasswordValues((prev) => ({ ...prev, [name]: value }));
  };

  const onForgotPasswordSubmit = () => {
    const { email } = forgotPasswordValues;

    if (!email.trim())
      return setForgotPasswordErrors((prev) => ({
        ...prev,
        email: 'Required!'
      }));

    if (!isEmail(email.trim()))
      return setForgotPasswordErrors((prev) => ({
        ...prev,
        email: 'Enter valid email!'
      }));

    AuthService.resetPassword(email)
      .then((res) => {
        localStorage.setItem('ResetPasswordEmail', email);
        navigate(`${authPaths.main}${authPaths.emailSent}`);
      })
      .catch((err) => console.log(err));
  };

  const onCancel = () => navigate(`${authPaths.main}${authPaths.login}`);

  return (
    <main className={styles.forgot__container}>
      <section className={styles.forgot__content}>
        <Section className={styles.forgot__form}>
          <Typography.Title
            view={TitleView.medium}
            className={styles.forgot__title}
            isCentered
          >
            Forgot password
          </Typography.Title>

          <Typography.Paragraph
            view={ParagraphView.medium}
            color={ParagraphColor.gray}
            isCentered
            className={styles.forgot__subtitle}
          >
            Enter your email address below to receive a password reset link.
          </Typography.Paragraph>

          <Input
            className={styles.forgot__email}
            name="email"
            label="Email"
            errorMessage={forgotPasswordErrors.email}
            Icon={EmailIcon}
            inputProps={{
              type: 'email',
              value: forgotPasswordValues.email,
              onChange: onFieldChange,
              placeholder: 'Enter your email'
            }}
          />

          <section className={styles.forgot__buttons}>
            <Button
              view={ButtonView.ghost}
              onClick={onCancel}
              LeftAddon={ArrowLeftIcon}
            >
              Go back
            </Button>
            <Button
              view={ButtonView.primary}
              onClick={onForgotPasswordSubmit}
              LeftAddon={SendIcon}
            >
              Send password reset link
            </Button>
          </section>
        </Section>
      </section>
    </main>
  );
};

export default Login;
