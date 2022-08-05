/* eslint-disable react-hooks/exhaustive-deps */
import { AxiosError } from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthService from '../../api/services/auth.service';

import useProfileStore from '../../store/useProfileStore';

import Button from '../../components/button';
import Input from '../../components/input';
import Typography from '../../components/typography';
import Section from './../../components/section';

import LogoIcon from '../../icons/Logo';
import EmailIcon from '../../icons/Email';
import KeyIcon from '../../icons/Key';

import { isEmail } from '../../utils/fn';
import { authPaths, dashboardPaths } from '../../utils/paths';
import { ButtonView } from '../../utils/enums/button';
import {
  TitleView,
  ParagraphView,
  ParagraphColor
} from '../../utils/enums/typography';

import styles from './login.module.scss';
import useSummaryStore from '../../store/useSummaryStore';

export type LoginFormValues = {
  email: string;
  password: string;
};

const defaultLoginFormValues: LoginFormValues = {
  email: '',
  password: ''
};

const defaultLoginFormErrors: LoginFormValues = {
  email: '',
  password: ''
};

const Login = () => {
  const { setToken, setProfileData } = useProfileStore();
  const { openSummary } = useSummaryStore();

  const [loginFormValues, setLoginFormValues] = useState<LoginFormValues>(
    defaultLoginFormValues
  );

  const [loginFormErrors, setLoginFormErrors] = useState<LoginFormValues>(
    defaultLoginFormErrors
  );

  const navigate = useNavigate();

  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLoginFormValues((prev) => ({ ...prev, [name]: value }));
    setLoginFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = (cb: () => void) => {
    const errors = { ...defaultLoginFormErrors };

    const { email, password } = loginFormValues;

    if (!email.trim()) errors.email = 'Required!';

    if (!isEmail(email.trim())) errors.email = 'Enter valid email!';

    if (!password.trim()) errors.password = 'Required!';

    if (password.trim().length < 7)
      errors.password = 'Password must be no less then 7 characters long';

    if (Object.values(errors).some((validationError) => validationError.length))
      return setLoginFormErrors((prev) => ({ ...prev, ...errors }));

    cb();
  };

  const onLoginSubmit = async () => {
    validate(() => {
      AuthService.login(loginFormValues)
        .then((res) => {
          setToken(res.data.token);
          // localStorage.setItem("AuthToken", res.data.token);
          navigate(`${dashboardPaths.main}${dashboardPaths.dashboard}`);
        })
        .catch((err: AxiosError<{ message: string }>) => {
          console.log(err);

          setLoginFormValues(defaultLoginFormValues);

          if (
            err?.code === 'ERR_NETWORK' ||
            (err?.response?.status && err?.response?.status > 500)
          ) {
            openSummary({
              isSuccess: false,
              title: 'Server nor responding',
              subtitle: 'Try to connect later.',
              closeButtonText: 'Okay'
            });
          }

          if (err.response?.data?.message === 'Incorrect email or password') {
            setLoginFormErrors({
              email: err.response?.data?.message || '',
              password: 'invalid'
            });
          }
        });
    });
  };

  const onForgotPassword = () =>
    navigate(`${authPaths.main}${authPaths.forgotPassword}`);

  useEffect(() => {
    setToken('');
    setProfileData();
  }, []);

  return (
    <main className={styles.login__container}>
      <section className={styles.login__content}>
        <div className={styles.login__logo}>
          <LogoIcon width="156px" height="64px" />
        </div>

        <Section className={styles.login__form}>
          <Typography.Title
            view={TitleView.medium}
            className={styles.login__title}
            isCentered
          >
            Welcome back
          </Typography.Title>

          <Typography.Paragraph
            view={ParagraphView.medium}
            color={ParagraphColor.gray}
            isCentered
            className={styles.login__subtitle}
          >
            Log in using your email to continue.
          </Typography.Paragraph>

          <Input
            className={styles.login__email}
            name="email"
            label="Email"
            errorMessage={loginFormErrors.email}
            Icon={EmailIcon}
            inputProps={{
              type: 'email',
              value: loginFormValues.email,
              onChange: onFieldChange,
              placeholder: 'Enter your email'
            }}
          />

          <section className={styles.login__password}>
            <Input
              className={styles.login__password_input}
              name="password"
              label="Password"
              errorMessage={loginFormErrors.password}
              Icon={KeyIcon}
              inputProps={{
                type: 'password',
                value: loginFormValues.password,
                onChange: onFieldChange,
                placeholder: 'Enter your email'
              }}
            />

            <Typography.Paragraph
              view={ParagraphView.small}
              color={ParagraphColor.gray}
              className={styles.login__password_forgot}
              onClick={onForgotPassword}
            >
              Forgot Password?
            </Typography.Paragraph>
          </section>

          <Button view={ButtonView.primary} onClick={onLoginSubmit} isFullWidth>
            Log In
          </Button>
        </Section>
      </section>
    </main>
  );
};

export default Login;
