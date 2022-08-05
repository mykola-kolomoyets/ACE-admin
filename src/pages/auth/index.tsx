import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { authPaths } from '../../utils/paths';

import Spinner from '../../components/spinner';

const Login = lazy(() => import('../../views/login'));
const ForgotPassword = lazy(() => import('../../views/forgot-password'));
const ChangePassword = lazy(() => import('../../views/change-password'));
const EmailSent = lazy(() => import('./../../views/email-sent'));

const AuthPages = () => (
  <Suspense fallback={<Spinner />}>
    <Routes>
      <Route path={authPaths.login} element={<Login />} />
      <Route path={authPaths.forgotPassword} element={<ForgotPassword />} />
      <Route
        path={`${authPaths.changePassword}/:token`}
        element={<ChangePassword />}
      />
      <Route path={authPaths.emailSent} element={<EmailSent />} />
    </Routes>
  </Suspense>
);

export default AuthPages;
