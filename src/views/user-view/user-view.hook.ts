/* eslint-disable react-hooks/exhaustive-deps,@typescript-eslint/no-non-null-assertion */
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import UserService from '../../api/services/user.service';

import useSummaryStore from '../../store/useSummaryStore';
import useNavbarStore from '../../store/useNavbarStore';
import useProfileStore from '../../store/useProfileStore';

import { ListItemProps } from '../../components/list/list-item';

import { dashboardPaths } from '../../utils/paths';
import { isEmail } from '../../utils/fn';
import { Roles } from '../../utils/enums/common';
import { SummaryLabel } from '../../utils/types/summary';
import {
  EditUserErrors,
  EditUserValues,
  UserData
} from '../../utils/types/user';

import {
  createDefaultEdituserValues,
  createTransactionsRows,
  createUserInfoData,
  createVoucherRows,
  deactivateListData,
  defaultEditUserErrors,
  defaultEditUserValues,
  mockVoucherData,
  summaryIcons,
  summaryLabels,
  transactionsTableHead,
  vouchersTableHead,
  roleItems
} from './user-view.constants';
import { StatusCodes } from 'http-status-codes';

const useUserView = () => {
  /**
   * === STORES
   */
  const { openSummary } = useSummaryStore();
  const { setActiveItem } = useNavbarStore();
  const { firstName, lastName } = useProfileStore();

  /**
   * === STATE
   */
  const [isFetching, setIsFetching] = useState(false);
  const [isDeactivateOpen, setIsDeactivateOpen] = useState(false);
  const [isReAactivateOpen, setIsReActivateOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false);

  const [userData, setUserData] = useState<UserData>();

  const [editUserValues, setEditUserValues] = useState<EditUserValues>(
    defaultEditUserValues
  );
  const [editUserErrors, setEditUserErrors] = useState<EditUserErrors>(
    defaultEditUserErrors
  );

  /**
   * === OTHER HOOKS
   */
  const navigate = useNavigate();

  const { id } = useParams<'id'>();

  /**
   * === MEMOS
   */

  const isCurrentUser = useMemo(
    () =>
      `${firstName} ${lastName}` ===
      `${userData?.userInfo?.firstName} ${userData?.userInfo?.lastName}`,
    [
      firstName,
      lastName,
      userData?.userInfo?.firstName,
      userData?.userInfo?.lastName
    ]
  );

  const isUserActive = useMemo(
    () => !userData?.userInfo?.isBlocked,
    [userData?.userInfo]
  );

  const transactionVolume = useMemo(() => {
    if (!userData?.userInfo.transactionVolume?.length) return 0;

    return 0;
  }, [userData?.userInfo.transactionVolume]);

  const summaryData: SummaryLabel[] = useMemo(
    () =>
      [userData?.userInfo.tokenBalance, transactionVolume].map(
        (item, index) => ({
          label: summaryLabels[index],
          Icon: summaryIcons[index],
          isWithDecimalPart: true,
          isWithBadge: false,
          amount: { previousValue: item || 0, currentValue: item || 0 },
          isFetching: false
        })
      ),
    [userData?.userInfo]
  );

  const vouchersTableData = useMemo(
    () => createVoucherRows(mockVoucherData),
    [mockVoucherData]
  );

  const transactionsTableData = useMemo(
    () =>
      createTransactionsRows(
        userData?.userInfo.wallet || '',
        userData?.tokenTransactions
      ),
    [userData?.tokenTransactions, userData?.userInfo.wallet]
  );

  const userInfoData: ListItemProps[] = useMemo(
    () => (userData?.userInfo ? createUserInfoData(userData?.userInfo) : []),
    [userData?.userInfo]
  );

  /**
   * === FUNCTIONS
   */

  const onUsersViewReturn = () =>
    navigate(`${dashboardPaths.main}${dashboardPaths.users}`);

  // === DEACTIVATE USER

  const onDeactivateUserOpen = () => setIsDeactivateOpen(true);
  const onDeactivateUserClose = () => setIsDeactivateOpen(false);

  const onDeactivateUser = () => {
    UserService.deactivateUser(id!)
      .then(() => {
        openSummary({
          isSuccess: true,
          title: 'User deactivated',
          subtitle:
            'All tokens in the user’s wallet have been burned and this user will not be able to log in until the account is re-activated.',
          onCloseCallback: onUsersViewReturn
        });
      })
      .catch((err) => {
        console.log(err);

        openSummary({
          isSuccess: false,
          title: 'User was not deactivated',
          onCloseCallback: onUsersViewReturn
        });
      })
      .finally(() => onDeactivateUserClose());
  };

  // === RE-ACTIVATE USER

  const onReActivateOpen = () => setIsReActivateOpen(true);
  const onReActivateClose = () => setIsReActivateOpen(false);

  const onReActivateUser = () => {
    UserService.reactivateUser(id!)
      .then(() => {
        openSummary({
          isSuccess: true,
          title: 'User will be re-activated',
          subtitle: '',
          onCloseCallback: onUsersViewReturn
        });
      })
      .catch((err) => {
        console.log(err);

        openSummary({
          isSuccess: false,
          title: 'User was not re-activated',
          subtitle: '',
          onCloseCallback: onUsersViewReturn
        });
      })
      .finally(() => onReActivateClose());
  };

  // === EDIT USER

  const onEditUserOpen = () => setIsEditUserOpen(true);
  const onEditUserClose = () => setIsEditUserOpen(false);

  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setEditUserValues((prev) => ({ ...prev!, [name]: value }));
  };

  const onUserRoleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setEditUserValues((prev) => ({
      ...prev,
      role: event.target.value as keyof typeof Roles
    }));

  const validateEditUser = (cb: () => void) => {
    const editedValues = Object.values(editUserValues).map((value) =>
      value.trim()
    );

    const currentUserData = [
      userData?.userInfo.firstName,
      userData?.userInfo.lastName,
      userData?.userInfo.email,
      userData?.userInfo.role
    ];

    const isDataEqual = editedValues.every(
      (field, index) => field === currentUserData[index]
    );

    if (isDataEqual) {
      onEditUserClose();
      return openSummary({
        isSuccess: false,
        title: 'You did not change any data',
        subtitle:
          'Change some of personal information to update current user data.'
      });
    }

    const errors = { ...defaultEditUserErrors };
    const [firstName, lastName, email] = editedValues;

    if (!firstName || firstName.length < 3)
      errors.firstName = 'Enter valid first name';

    if (!lastName || lastName.length < 3)
      errors.lastName = 'Enter valid last name';

    if (!email || !isEmail(email)) errors.email = 'Enter valid email';

    if (Object.values(errors).some((error) => error.length))
      return setEditUserErrors(errors);

    cb();
  };

  const onEditUser = () => {
    validateEditUser(() =>
      UserService.updateUserById(id!, editUserValues)
        .then((res) => {
          openSummary({
            isSuccess: true,
            title: 'User data is updated',
            subtitle: ''
          });

          UserService.getUser(id!)
            .then((res) => {
              setUserData({ ...res.data, ...editUserValues });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err);

          openSummary({
            isSuccess: true,
            title: 'User data was not updated',
            subtitle: 'The error occurred. Please, try again later.'
          });
        })
        .finally(() => onEditUserClose())
    );
    onEditUserClose();
  };

  // === DELETE USER

  const onDeleteUserOpen = () => setIsDeleteUserOpen(true);
  const onDeleteUserClose = () => setIsDeleteUserOpen(false);

  const onDeleteUserSummaryClose = () =>
    navigate(`${dashboardPaths.main}${dashboardPaths.users}`);

  const onDeleteUser = () => {
    UserService.deleteUser(id!)
      .then(() => {
        openSummary({
          isSuccess: true,
          title: 'User deleted',
          subtitle: 'All data associated with the user has been deleted.',
          closeButtonText: 'Return to Users',
          onCloseCallback: onDeleteUserSummaryClose
        });
      })
      .catch(() => {
        openSummary({
          isSuccess: false,
          title: 'User was not deleted',
          // subtitle: "All data associated with the user has been deleted.",
          closeButtonText: 'Return to Users',
          onCloseCallback: onDeleteUserSummaryClose
        });
      })
      .finally(() => {
        onDeleteUserClose();
      });
  };

  /**
   * === EFFECTS
   */
  useEffect(() => {
    setActiveItem(1);
  }, []);

  useEffect(() => {
    if (id) {
      setIsFetching(true);
      UserService.getUser(id)
        .then((res) => {
          setUserData(res.data);
          setIsFetching(false);
        })
        .catch((err) => {
          if (err.response.status === StatusCodes.CONFLICT) {
            openSummary({
              isSuccess: false,
              title: 'Error occurred while opening current user',
              subtitle:
                'The is an error with getting the wallet data of current user. Please try again later',
              onCloseCallback: () =>
                navigate(`${dashboardPaths.main}${dashboardPaths.users}`),
              closeButtonText: 'Back to users'
            });
          }
        });
    }
  }, [id]);

  useEffect(() => {
    if (userData) {
      setEditUserValues(createDefaultEdituserValues(userData.userInfo));
    }
  }, [userData]);

  return {
    isCurrentUser,
    isFetching,
    userData,
    summaryData,
    dataForList: userInfoData,
    vouchersTableHead,
    vouchersTableData,
    transactionsTableHead,
    transactionsTableData,
    isUserActive,
    isDeactivateOpen,
    isEditUserOpen,
    isReAactivateOpen,
    onDeactivateUserOpen,
    onDeactivateUserClose,
    onDeactivateUser,
    onEditUserOpen,
    onEditUserClose,
    onUserRoleChange,
    onEditUser,
    onReActivateOpen,
    onReActivateClose,
    onReActivateUser,
    onDeleteUserOpen,
    onDeleteUserClose,
    onDeleteUser,
    isDeleteUserOpen,
    deactivateListData,
    editUserValues,
    onFieldChange,
    editUserErrors,
    roleItems
  };
};

export default useUserView;
