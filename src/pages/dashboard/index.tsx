import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { dashboardPaths } from '../../utils/paths';

import Spinner from '../../components/spinner';

const Dashboard = lazy(() => import('../../views/dashboard'));

const Users = lazy(() => import('../../views/users'));
const UserView = lazy(() => import('../../views/user-view'));

const Profile = lazy(() => import('../../views/profile'));

const Vouchers = lazy(() => import('../../views/vouchers'));
const VoucherView = lazy(() => import('../../views/voucher-view'));
const EditCreateVoucher = lazy(
  () => import('./../../views/voucher-edit-create')
);

const DashboardPages = () => (
  <Suspense fallback={<Spinner />}>
    <Routes>
      <Route path={dashboardPaths.dashboard} element={<Dashboard />} />

      <Route path={dashboardPaths.users} element={<Users />} />
      <Route path={`${dashboardPaths.users}/:id`} element={<UserView />} />

      <Route path={dashboardPaths.profile} element={<Profile />} />

      <Route path={dashboardPaths.vouchers} element={<Vouchers />} />
      <Route
        path={`${dashboardPaths.vouchers}/:id`}
        element={<VoucherView />}
      />
      <Route
        path={`${dashboardPaths.vouchers}${dashboardPaths.createUpdateVoucher}`}
        element={<EditCreateVoucher />}
      />
      <Route
        path={`${dashboardPaths.vouchers}${dashboardPaths.createUpdateVoucher}/:id`}
        element={<EditCreateVoucher />}
      />
    </Routes>
  </Suspense>
);

export default DashboardPages;
