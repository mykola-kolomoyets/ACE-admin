/* eslint-disable react-hooks/exhaustive-deps,@typescript-eslint/no-non-null-assertion */
import { ChangeEvent, useEffect, useState } from 'react';

import UserService from '../../api/services/user.service';

import useNavbarStore from '../../store/useNavbarStore';

import useSummaryStore from '../../store/useSummaryStore';
import useUserListStore, {
  UsersCategories
} from '../../store/useUserListStore';

import { getCurrentTab } from '../../components/tabs/tabs.utils';

import { Roles } from '../../utils/enums/common';
import { UserStatus } from '../../utils/enums/user';
import { Label } from '../../utils/types/common';
import { isEmail } from '../../utils/fn';
import { Row } from '../../utils/types/table';
import useDebounce from '../../utils/hooks/useDebounce';

import {
  createUsersRows,
  defaultFormErrors,
  defaultFormValues,
  limitStep,
  usersTableHead,
  usersTabs
} from './users.constants';
import { InviteUsersFormValues } from '../../utils/types/user';
import useNotificationStore from '../../store/useNotificationStore';
import { NotificationType } from '../../utils/enums/notification';

const useUsers = () => {
  const { isFetching, users, skip, total, categories, fetchUsers } =
    useUserListStore();
  const openSummary = useSummaryStore().openSummary;
  const setActiveItem = useNavbarStore().setActiveItem;

  const [showFromCount, setShowFromCount] = useState(1);

  const [isFormShow, setIsFormShow] = useState(false);

  const [selectedTab, setSelectedTab] = useState<Label>(usersTabs.all);

  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useDebounce(searchValue, 500);

  const [usersRows, setUsersRows] = useState<Row[]>([]);

  const [formValues, setFormValues] =
    useState<InviteUsersFormValues>(defaultFormValues);
  const [formErrors, setFormErrors] = useState(defaultFormErrors);

  const onTabChange = (selected: string) => {
    setSelectedTab(getCurrentTab(usersTabs, selected)!);
    fetchUsers(0, selected as keyof UsersCategories);
  };

  const viewNewPage = (newSkip: number) => {
    fetchUsers(
      newSkip,
      selectedTab.value as keyof UsersCategories,
      searchValue
    );
    setShowFromCount(newSkip + 1);
  };

  const onFormClose = () => {
    setFormValues(defaultFormValues);
    setFormErrors(defaultFormErrors);

    setIsFormShow(false);
  };

  const onFormOpen = () => setIsFormShow(true);

  const onEmailsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormErrors({ emails: '' });

    setFormValues((prev) => ({
      ...prev,
      emails: event.target.value
    }));
  };

  const onUserRoleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setFormValues((prev) => ({
      ...prev,
      role: event.target.value as keyof typeof Roles
    }));

  const onFormSubmit = () => {
    const { emails, role } = formValues;

    if (!emails) return setFormErrors({ emails: 'Required' });

    const splittedEmails = emails.split(', ');

    const rightEmails = splittedEmails.filter((email) => isEmail(email));

    if (!rightEmails?.length)
      return setFormErrors({ emails: 'Enter valid emails' });

    UserService.inviteUsers(splittedEmails, role)
      .then((res) => {
        const receiversString =
          rightEmails.length > 1
            ? `Invitation emails are sent to ${rightEmails.length} users`
            : `Invitation email was sent to ${rightEmails[0]}`;

        openSummary({
          isSuccess: true,
          title: 'Invitation sent',
          subtitle: receiversString
        });
      })
      .catch((err) => {
        console.log(err);

        openSummary({
          isSuccess: false,
          title: 'Invitation were not sent'
        });
      })
      .finally(() => onFormClose());
  };

  const goNextPage = () => {
    const newSkip = skip + limitStep;

    if (newSkip > total) return;

    viewNewPage(newSkip);
  };

  const goPrevPage = () => {
    const newSkip = skip - limitStep;

    if (newSkip < 0) return;

    viewNewPage(newSkip);
  };

  useEffect(() => {
    fetchUsers(skip, selectedTab.value as UserStatus, debouncedSearch);
  }, [skip, fetchUsers]);

  useEffect(() => {
    debouncedSearch &&
      fetchUsers(0, selectedTab.value as UserStatus, debouncedSearch);
  }, [debouncedSearch]);

  useEffect(() => {
    setUsersRows(createUsersRows(users));
  }, [users]);

  useEffect(() => {
    debouncedSearch && setShowFromCount(1);
  }, [debouncedSearch]);

  useEffect(() => {
    setShowFromCount(skip ? skip + 1 : 1);
  }, [skip]);

  useEffect(() => {
    setActiveItem(1);
    skip === 0 && viewNewPage(0);
  }, []);

  return {
    isFormShow,
    onFormClose,
    onFormOpen,
    formValues,
    onEmailsChange,
    onUserRoleChange,
    onFormSubmit,
    formErrors,
    selectedTab,
    onTabChange,
    searchValue,
    setSearchValue,
    usersCategories: categories,
    usersRows,
    tableHead: usersTableHead,
    showFromCount,
    skip,
    total,
    isFetching,
    goNextPage,
    goPrevPage
  };
};

export default useUsers;
