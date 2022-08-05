/* eslint-disable react-hooks/exhaustive-deps */
import { FC, Fragment, lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';

import Service from './api/config';

import Header from './components/header';
import Navbar from './components/navbar';
import Summary from './components/summary';
import Spinner from './components/spinner';

import { dashboardPaths, authPaths } from './utils/paths';

import styles from './app.module.scss';
import { Toaster } from 'react-hot-toast';

const DashboardPages = lazy(() => import('./pages/dashboard'));
const AuthPages = lazy(() => import('./pages/auth'));

const App: FC = () => {
  const navigate = useNavigate();

  const isAuthToken = () => Boolean(Service.getAuthToken());
  const isChangePassword = window.location.pathname.includes(
    `${authPaths.main}${authPaths.changePassword}`
  );

  const onLogoClick = () =>
    navigate(`${dashboardPaths.main}${dashboardPaths.dashboard}`);

  useEffect(() => {
    if (!isAuthToken() && !isChangePassword)
      navigate(`${authPaths.main}${authPaths.login}`);
  }, []);

  return (
    <main className={styles.app}>
      <Toaster
        toastOptions={{
          position: 'top-right',
          className: 'notification-popup'
        }}
      />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to={
                  isAuthToken()
                    ? `${dashboardPaths.main}${dashboardPaths.dashboard}`
                    : `${authPaths.main}${
                        isChangePassword
                          ? authPaths.changePassword
                          : authPaths.login
                      }`
                }
              />
            }
          />

          <Route
            path={`${dashboardPaths.main}/*`}
            element={
              <Fragment>
                <Header onLogoClick={onLogoClick} />

                <section className={styles.app__content}>
                  <div className={styles.app__left}>
                    <Navbar />
                  </div>

                  <div className={styles.app__right}>
                    <DashboardPages />
                  </div>
                </section>
              </Fragment>
            }
          />

          <Route path={`${authPaths.main}/*`} element={<AuthPages />} />
        </Routes>
      </Suspense>
      <Summary />
    </main>
  );
};

export default App;
