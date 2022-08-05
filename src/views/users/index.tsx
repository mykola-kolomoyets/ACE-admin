import { Fragment, lazy } from 'react';

import Typography from './../../components/typography';
import Button from '../../components/button';
import Section from '../../components/section';
import Table from '../../components/table';
import Tabs from '../../components/tabs';
import { Tab } from '../../components/tabs/tab';
import Pagination from '../../components/pagination';
import Input from '../../components/input';
import ExportButton from '../../components/export -button';

import PlusIcon from './../../icons/Plus';
import SearchIcon from './../../icons/Search';
import Spinner from '../../icons/Spinner';

import { capitalize } from '../../utils/fn';
import { hoc } from '../../utils/hoc';
import { TitleView } from '../../utils/enums/typography';
import { ButtonView, ExportOption } from '../../utils/enums/button';

import useUsers from './users.hook';
import { limitStep } from './users.constants';

import styles from './users.module.scss';
import NotificationPopup from '../../components/notification-popup';

const InviteUsersPopup = lazy(() => import('./popups/InviteUsersPopup'));

const Users = hoc(
  useUsers,
  ({
    isFormShow,
    onFormClose,
    onFormOpen,
    formValues,
    onFormSubmit,
    formErrors,
    onEmailsChange,
    onUserRoleChange,
    selectedTab,
    onTabChange,
    searchValue,
    setSearchValue,
    usersCategories,
    usersRows,
    tableHead,
    showFromCount,
    skip,
    total,
    isFetching,
    goNextPage,
    goPrevPage
  }) => (
    <section className={styles.users}>
      <InviteUsersPopup
        visible={isFormShow}
        onClose={onFormClose}
        formValues={formValues}
        onChange={onEmailsChange}
        formErrors={formErrors}
        onUserRoleChange={onUserRoleChange}
        onClick={onFormSubmit}
      />

      <section className={styles.users__title}>
        <Typography.Title view={TitleView.medium}>Users</Typography.Title>

        <div className={styles.users__title_buttons}>
          <ExportButton option={ExportOption.users} />

          <Button
            view={ButtonView.primary}
            onClick={onFormOpen}
            LeftAddon={PlusIcon}
          >
            New User
          </Button>
        </div>
      </section>

      <Section className={styles.users__table}>
        <Tabs selectedId={selectedTab} onChange={onTabChange}>
          <Fragment>
            {Object.entries(usersCategories).map((item) => (
              <Tab
                key={item[0]}
                title={capitalize(item[0])}
                id={item[0]}
                rightAddons={item[1]}
              >
                <Fragment>
                  <Input
                    className={styles.users__search}
                    name="name"
                    Icon={SearchIcon}
                    inputProps={{
                      value: searchValue,
                      onChange: (e) => setSearchValue(e.target.value),
                      placeholder: 'Search for a user',
                      disabled: isFetching,
                      autoComplete: 'on',
                      autoCorrect: 'on'
                    }}
                  />
                  {isFetching ? (
                    <Spinner />
                  ) : (
                    <Fragment>
                      <Table
                        thead={tableHead}
                        tbody={usersRows}
                        sortedFields={[0]}
                        emptyState="No users to show..."
                      />
                      {usersRows.length ? (
                        <Pagination
                          from={showFromCount}
                          to={
                            total < skip + limitStep ? total : skip + limitStep
                          }
                          total={total}
                          delta={limitStep}
                          showNext={goNextPage}
                          showPrev={goPrevPage}
                          disabledNext={usersRows?.length !== limitStep}
                        />
                      ) : null}
                    </Fragment>
                  )}
                </Fragment>
              </Tab>
            ))}
          </Fragment>
        </Tabs>
      </Section>
    </section>
  )
);

export default Users;
