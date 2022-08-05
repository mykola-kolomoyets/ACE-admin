import { ListItemProps } from '../../components/list/list-item';
import { Option } from '../../components/select';

import DashboardIcon from './../../icons/Dashboard';
import CoinsIcon from './../../icons/Coins';

import { DateUtils } from '../../utils/date.utils';
import { VoucherStatus } from '../../utils/enums/voucher';
import { Icon } from '../../utils/types/icon';
import {
  EditUserErrors,
  EditUserValues,
  User,
  UserData,
  UserTransaction
} from '../../utils/types/user';
import { VoucherItem } from '../../utils/types/voucher';
import { getUserName } from '../../utils/fn';
import { ListItemType } from '../../utils/enums/list';
import { TableCellTypes } from '../../utils/enums/table';
import { Row } from '../../utils/types/table';
import { UserStatus } from '../../utils/enums/user';
import { Roles } from '../../utils/enums/common';

export const roleItems: Option[] = [
  { label: Roles.CUSTOMER, value: 'CUSTOMER' },
  { label: Roles.CASHIER, value: 'CASHIER' },
  { label: Roles.ADMIN, value: 'ADMIN' }
];

export const vouchersTableHead = [
  'Voucher ID',
  'Voucher type',
  'Voucher status',
  'Valid until'
];

export const transactionsTableHead = [
  'Date & time',
  'Txn ID',
  'To/from',
  'Description',
  'Value'
];

export const mockVoucherData: VoucherItem[] = [
  {
    id: 'Lh27SA3op4ab',
    type: 'Free coffee',
    status: VoucherStatus.REDEEMED,
    validUntil: new Date()
  },
  {
    id: 'AmD6VH7axfRn',
    type: 'Free sandwich',
    status: VoucherStatus.VALID,
    validUntil: new Date()
  }
];

export const createVoucherRows = (data: VoucherItem[]): Row[] =>
  data.map((voucher) => ({
    cells: [
      {
        type: TableCellTypes.STRING,
        value: voucher.id
      },
      {
        type: TableCellTypes.STRING,
        value: voucher.type
      },
      {
        type: TableCellTypes.STATUS,
        value: voucher.status,
        status: voucher.status
      },
      {
        type: TableCellTypes.DATE,
        value: DateUtils.dateToString(voucher.validUntil, false)
      }
    ]
  }));

export const createTransactionsRows = (
  userWallet: string,
  data?: UserTransaction[]
): Row[] => {
  if (!data) return [];

  const isUserReceiver = (transaction: UserTransaction) =>
    userWallet === transaction.to;

  return data.map((transaction) => {
    return {
      cells: [
        {
          type: TableCellTypes.DATE,
          value: DateUtils.dateToString(new Date(transaction.createdAt), false)
        },
        {
          type: TableCellTypes.STRING_WITH_SLICE,
          value: transaction.transactionHash
        },
        {
          type: TableCellTypes.STRING_WITH_CUT,
          value: isUserReceiver(transaction) ? transaction.from : transaction.to
        },
        {
          type: TableCellTypes.STRING_WITH_CUT,
          value: transaction.description || ''
        },
        {
          type: TableCellTypes.AMOUNT,
          value: `${isUserReceiver(transaction) ? '+' : '-'}${
            transaction.amount
          }`,
          withSign: true
        }
      ]
    };
  });
};

export const deactivateUserData = {
  firstName: 'Dianne',
  lastName: 'Russell',
  tokensToBeBurned: 123.45,
  toBeReimbursed: 123.45
};

export const deactivateListData: ListItemProps[] = [
  {
    type: ListItemType.string,
    label: 'Name',
    value: getUserName(deactivateUserData as unknown as User)
  },
  {
    type: ListItemType.amount,
    label: 'Tokens to be burned',
    value: deactivateUserData.tokensToBeBurned.toString()
  },
  {
    type: ListItemType.amount,
    label: 'To be reimbursed',
    value: deactivateUserData.toBeReimbursed.toString()
  }
];

export const summaryLabels = ['Token balance', 'Transaction volume'];

export const summaryIcons: Icon[] = [CoinsIcon, DashboardIcon];

export const defaultEditUserValues: EditUserValues = {
  firstName: '',
  lastName: '',
  email: '',
  role: 'CUSTOMER'
};

export const createDefaultEdituserValues = (user: User): EditUserValues => ({
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  role: user.role
});

export const defaultEditUserErrors: EditUserErrors = {
  firstName: '',
  lastName: '',
  email: ''
};

export const createUserInfoData = (
  userInfo: UserData['userInfo']
): ListItemProps[] => [
  {
    type: ListItemType.status,
    label: 'User status',
    value: userInfo.isBlocked ? UserStatus.inactive : UserStatus.active
  },
  {
    type: ListItemType.string,
    label: 'Name',
    value: `${userInfo.firstName} ${userInfo.lastName}`
  },
  {
    type: ListItemType.string,
    label: 'Email',
    value: userInfo.email || ''
  },
  {
    type: ListItemType.string,
    label: 'User role',
    value: Roles[userInfo.role] || ''
  },
  {
    type: ListItemType.string_to_copy,
    label: 'Wallet address',
    value: userInfo.wallet || ''
  },
  {
    type: ListItemType.date,
    label: 'Created on',
    value: new Date(userInfo.createdAt)
  }
];
