/* eslint-disable no-unused-vars */
import { UsersCategories } from '../../store/useUserListStore';

import { Roles } from '../enums/common';
import { UserStatus } from '../enums/user';
import { Label } from './common';
import { Transaction } from './transaction';

export type User = {
  id: string;
  _id: string;
  createdAt?: Date;
  birthDate: string;
  firstName: string;
  lastName: string;
  role: keyof typeof Roles;
  email: string;
  balance: number;
  transactionVolume: number;
  status: UserStatus;
  isApproved: boolean;
  isBlocked: boolean;
  isDeleted: boolean;
  isPhoneConfirmed: boolean;
  wallet: string;
  password?: string;
};

// export type CreateUser = {
//   email: string;
//   password: string;
//   firstName: string;
//   lastName: string;
// };

export type UserTransaction = {
  amount: number;
  createdAt: Date;
  description?: string;
  transactionHash: string;
  from: string;
  to: string;
};

export type UserData = {
  userInfo: User & { tokenBalance?: number; transactionVolume: Transaction[] };
  voucherTransactions: number;
  tokenTransactions: UserTransaction[];
};

export type EditUserValues = Pick<
  User,
  'firstName' | 'lastName' | 'email' | 'role'
>;

export type EditUserErrors = Omit<EditUserValues, 'role'>;

export type EditProfileInfo = {
  firstName: string;
  lastName: string;
  email: string;
};

export type EditProfilePassword = {
  currentPassword: string;
  newPassword: string;
  repeatedPassword: string;
};

export type InviteUsersFormValues = {
  emails: string;
  role: keyof typeof Roles;
};

export type UsersTabs = {
  [key in keyof UsersCategories]: Label;
};
