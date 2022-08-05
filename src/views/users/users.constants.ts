import { Option } from '../../components/select';

import { Roles } from '../../utils/enums/common';
import { TableCellTypes } from '../../utils/enums/table';
import { UserStatus } from '../../utils/enums/user';
import { getUserName } from '../../utils/fn';
import { dashboardPaths } from '../../utils/paths';
import { Row } from '../../utils/types/table';
import { InviteUsersFormValues, User, UsersTabs } from '../../utils/types/user';

import AdminIcon from './../../icons/Admin';
import CashierIcon from './../../icons/Cashier';

export const limitStep = 10;

export const usersTableHead = [
  'Name',
  'Email',
  'Token balance',
  'Transaction volume',
  'Status'
];

export const iconsByRole = {
  [Roles.ADMIN]: AdminIcon,
  [Roles.CASHIER]: CashierIcon,
  [Roles.CUSTOMER]: undefined
};

export const roleItems: Option[] = [
  { label: Roles.CUSTOMER, value: 'CUSTOMER' },
  { label: Roles.CASHIER, value: 'CASHIER' },
  { label: Roles.ADMIN, value: 'ADMIN' }
];

export const getUserStatus = (user: User) => {
  if (user?.isBlocked || user?.isDeleted) return UserStatus.inactive;
  if (!user?.isApproved) return UserStatus.pending;
  return UserStatus.active;
};

export const createUsersRows = (data: User[] | null): Row[] =>
  data?.length
    ? data.map((user) => ({
        to: `${dashboardPaths.main}${dashboardPaths.users}/${user._id}`,
        cells: [
          {
            type: TableCellTypes.STRING_WITH_ICON,
            value: getUserName(user),
            Icon: iconsByRole[Roles[user.role]]
          },
          {
            type: TableCellTypes.STRING_WITH_CUT,
            value: user.email,
            maxLength: 20
          },
          {
            type: TableCellTypes.AMOUNT,
            value: user.balance.toString()
          },
          {
            type: TableCellTypes.AMOUNT,
            value: user?.transactionVolume?.toString()
          },
          {
            type: TableCellTypes.STATUS,
            value: getUserStatus(user),
            status: getUserStatus(user)
          }
        ]
      }))
    : ([] as Row[]);

export const usersTabs: UsersTabs = {
  all: {
    label: 'All',
    value: 'all'
  },
  Active: {
    label: 'Active',
    value: UserStatus.active
  },
  Inactive: {
    label: 'Inactive',
    value: UserStatus.inactive
  },
  Pending: {
    label: 'Pending',
    value: UserStatus.pending
  }
};

export const defaultFormValues: InviteUsersFormValues = {
  emails: '',
  role: 'CUSTOMER'
};

export const defaultFormErrors: Pick<InviteUsersFormValues, 'emails'> = {
  emails: ''
};
