import { lazy, Fragment } from 'react';

import BreadCrumbs from '../../components/breadcrumbs';
import Button from '../../components/button';
import List from '../../components/list';
import Section from '../../components/section';
import SummaryItem from '../../components/summary-item';
import Table from '../../components/table';
import Typography from '../../components/typography';

import { TitleView } from '../../utils/enums/typography';
import { getUserName } from '../../utils/fn';
import { hoc } from '../../utils/hoc';
import { dashboardPaths } from '../../utils/paths';
import { ButtonView } from '../../utils/enums/button';

import useUserView from './user-view.hook';
import styles from './user-view.module.scss';
import Spinner from '../../components/spinner';

const DeactivateUserPopup = lazy(() => import('./popups/DeactivateUserPopup'));
const ReactivateUserPopup = lazy(() => import('./popups/ReactivateUserPopup'));
const DeleteUserPopup = lazy(() => import('./popups/DeleteUserPopup'));
const EditUserPopup = lazy(() => import('./popups/EditUserPopup'));

const UserView = hoc(
  useUserView,
  ({
    isCurrentUser,
    userData,
    summaryData,
    dataForList,
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
    onEditUser,
    roleItems,
    isFetching
  }) =>
    isFetching ? (
      <Spinner />
    ) : (
      <section className={styles.user_view}>
        <DeactivateUserPopup
          visible={isDeactivateOpen}
          onClose={onDeactivateUserClose}
          items={deactivateListData}
          onClick={onDeactivateUser}
        />

        <ReactivateUserPopup
          visible={isReAactivateOpen}
          onClose={onReActivateClose}
          onClick={onReActivateUser}
        />

        <DeleteUserPopup
          visible={isDeleteUserOpen}
          onClose={onDeleteUserClose}
          onClick={onDeleteUser}
        />

        <EditUserPopup
          visible={isEditUserOpen}
          onClose={onEditUserClose}
          onClick={onEditUser}
          items={roleItems}
          editUserValues={editUserValues}
          onChange={onFieldChange}
          onUserRoleChange={onUserRoleChange}
          editUserErrors={editUserErrors}
        />

        <section className={styles.user_view__title}>
          <BreadCrumbs
            start={{ label: 'Users', route: dashboardPaths.users.slice(1) }}
            current={getUserName(userData?.userInfo)}
          />

          {!isCurrentUser && (
            <div className={styles.user_view__title_buttons}>
              {isUserActive ? (
                <Fragment>
                  <Button view={ButtonView.red} onClick={onDeactivateUserOpen}>
                    Deactivate user
                  </Button>
                  <Button view={ButtonView.ghost} onClick={onEditUserOpen}>
                    Edit user
                  </Button>
                </Fragment>
              ) : (
                <Fragment>
                  <Button view={ButtonView.ghost} onClick={onReActivateOpen}>
                    Re-activate user
                  </Button>

                  <Button view={ButtonView.red} onClick={onDeleteUserOpen}>
                    Delete user
                  </Button>
                </Fragment>
              )}
            </div>
          )}
        </section>

        <section className={styles.user_view__content}>
          <section className={styles.user_view__left}>
            <section className={styles.user_view__summary}>
              {summaryData.map((item) => (
                <SummaryItem key={item.label} {...item} />
              ))}
            </section>

            <Section className={styles.user_view__vouchers}>
              <Typography.Title
                view={TitleView.small}
                className={styles.user_view__vouchers_title}
              >
                Vouchers
              </Typography.Title>

              <Table
                thead={vouchersTableHead}
                tbody={vouchersTableData}
                sortedFields={[0]}
                emptyState="No vouchers yet..."
              />
            </Section>

            <Section className={styles.user_view__transactions}>
              <Typography.Title
                view={TitleView.small}
                className={styles.user_view__transactions_title}
              >
                Transactions
              </Typography.Title>

              <Table
                thead={transactionsTableHead}
                tbody={transactionsTableData}
                sortedFields={[0]}
                emptyState="No transactions yet..."
              />
            </Section>
          </section>

          <section className={styles.user_view__info}>
            <Section className={styles.user_view__info_container}>
              <Typography.Title
                className={styles.user_view__info_title}
                view={TitleView.small}
              >
                User information
              </Typography.Title>

              <List items={dataForList} />
            </Section>
          </section>
        </section>
      </section>
    )
);

export default UserView;
