import { Fragment } from 'react';

import Button from '../../components/button';
import Pagination from '../../components/pagination';
import Section from '../../components/section';
import Table from '../../components/table';
import Tabs from '../../components/tabs';
import { Tab } from '../../components/tabs/tab';
import Typography from '../../components/typography';

import PlusIcon from '../../icons/Plus';

import { TitleView } from '../../utils/enums/typography';
import { capitalize } from '../../utils/fn';
import { hoc } from '../../utils/hoc';
import { ButtonView } from '../../utils/enums/button';

import { limitStep, vouchersTableHead } from './vouchers.constants';
import useVouchers from './vouchers.hook';
import styles from './vouchers.module.scss';
import Spinner from '../../icons/Spinner';

const Vouchers = hoc(
  useVouchers,
  ({
    isFetching,

    vouchersRows,

    onCreateVoucherClick,

    vouchersCategories,
    selectedTab,

    skip,
    total,
    showFromCount,

    onTabChange,
    goNextPage,
    goPrevPage
  }) => (
    <section className={styles.vouchers}>
      <section className={styles.vouchers__title}>
        <Typography.Title view={TitleView.medium}>Vouchers</Typography.Title>

        <Button
          view={ButtonView.primary}
          LeftAddon={PlusIcon}
          onClick={onCreateVoucherClick}
        >
          New voucher
        </Button>
      </section>

      <Section className={styles.vouchers__content}>
        <Tabs selectedId={selectedTab} onChange={onTabChange}>
          <Fragment>
            {Object.entries(vouchersCategories).map((item) => (
              <Tab
                key={item[0]}
                title={capitalize(item[0])}
                id={item[0]}
                rightAddons={+item[1]}
              >
                {isFetching ? (
                  <Spinner />
                ) : (
                  <Fragment>
                    <Table
                      thead={vouchersTableHead}
                      tbody={vouchersRows}
                      sortedFields={[0]}
                      emptyState="No vouchers to show..."
                    />

                    {vouchersRows.length ? (
                      <Pagination
                        from={showFromCount}
                        to={total < skip + limitStep ? total : skip + limitStep}
                        total={total}
                        delta={limitStep}
                        showNext={goNextPage}
                        showPrev={goPrevPage}
                        disabledNext={vouchersRows?.length !== limitStep}
                      />
                    ) : null}
                  </Fragment>
                )}
              </Tab>
            ))}
          </Fragment>
        </Tabs>
      </Section>
    </section>
  )
);

export default Vouchers;
