/* eslint-disable no-unused-vars,@typescript-eslint/no-unused-vars */
import create from 'zustand';
import { DateUtils } from '../utils/date.utils';

import { UserStatus } from '../utils/enums/user';
import { User } from '../utils/types/user';
import { convertArrayToCSV, downloadFile } from '../utils/fn';

import { getUserStatus, limitStep } from '../views/users/users.constants';

import UserService from './../api/services/user.service';

export type UsersCategories = {
  [key in UserStatus]: number;
} & { all: number };

const initialCategories = Object.values(UserStatus).reduce(
  (acc, curr) => ({ all: 0, ...acc, [curr]: 0 }),
  {}
) as UsersCategories;

interface UsersListStore {
  skip: number;
  total: number;

  isFetching: boolean;

  status: UserStatus | 'all' | null;
  users: User[] | null;
  categories: UsersCategories;

  fetchUsers: (
    skip?: number,
    statusFilter?: UserStatus | 'all',
    nameFilter?: string
  ) => void;
  setUsersStatus: (status: UserStatus | 'all') => void;

  exportCSV: () => void;
}

const useUserListStore = create<UsersListStore>((set, get) => ({
  skip: 0,
  total: 0,

  isFetching: false,

  status: 'all',
  users: null,
  categories: initialCategories,

  fetchUsers: async (skip, statusFilter = 'all', nameFilter) => {
    if (skip !== undefined) set({ skip });
    set({ isFetching: true, status: statusFilter });

    await UserService.getAllUsers()
      .then((res) => {
        const usersCategoriesData: UsersCategories = res.data.reduce(
          (acc, curr) => {
            return {
              ...acc,
              [getUserStatus(curr)]: acc[getUserStatus(curr)] + 1,
              all: res.data.length
            };
          },
          { ...initialCategories }
        );

        set({
          categories: usersCategoriesData
        });

        if ((!statusFilter || statusFilter === 'all') && !nameFilter)
          return set({
            users: res.data.slice(skip, skip + limitStep),
            total: res.data.length
          });

        let filteredUsers = res.data;

        if (statusFilter !== 'all') {
          filteredUsers = filteredUsers.filter(
            (user) => getUserStatus(user) === statusFilter
          );
        }

        if (nameFilter) {
          filteredUsers = res.data.filter(
            (user) =>
              user.firstName.toLowerCase().includes(nameFilter.toLowerCase()) ||
              user.lastName.toLowerCase().includes(nameFilter.toLowerCase())
          );
        }

        filteredUsers = filteredUsers.slice(skip, skip + limitStep);

        set({
          total: usersCategoriesData[statusFilter],
          users: filteredUsers.map((user) => {
            const { password, ...others } = user;

            return others;
          })
        });
      })
      .catch((err) => console.log(err))
      .finally(() => set({ isFetching: false }));
  },
  setUsersStatus: (status) => {
    set({ status });
  },

  exportCSV: () => {
    const { users, status } = get();

    const editedUsers = users?.map((user) => {
      const { password, ...others } = user;

      return others;
    });

    if (!editedUsers) return null;

    const csvUsers = convertArrayToCSV(editedUsers);

    downloadFile(
      [csvUsers],
      `ACE-users-${status}-${DateUtils.dateToString(new Date())}`
    );
  }
}));

export default useUserListStore;
