import { lazy } from 'react';

import BreadCrumbs from '../../components/breadcrumbs';
import Button from '../../components/button';
import List from '../../components/list';
import Section from '../../components/section';
import Table from '../../components/table';
import Typography from '../../components/typography';

import { ButtonView } from '../../utils/enums/button';
import { ListDirection } from '../../utils/enums/list';
import {
  ParagraphColor,
  ParagraphView,
  TitleView
} from '../../utils/enums/typography';
import { hoc } from '../../utils/hoc';
import { dashboardPaths } from '../../utils/paths';

import useVoucherView from './voucher-view.hook';

import styles from './voucher-view.module.scss';

const DeleteVoucherPopup = lazy(() => import('./popups/DeleteVoucherPopup'));

const VoucherView = hoc(
  useVoucherView,
  ({
    voucherData,
    redeemableProductsRows,
    voucherContent,
    voucherInfo,
    redeemableProductsTableHead,

    isDeleteVoucherOpen,
    onDeleteVoucherOpen,
    onDeleteVoucherClose,

    onDeleteVoucherClick,
    onEditVoucherClick
  }) => (
    <section className={styles.voucher_view}>
      <DeleteVoucherPopup
        visible={isDeleteVoucherOpen}
        onClose={onDeleteVoucherClose}
        onClick={onDeleteVoucherClick}
      />

      <section className={styles.voucher_view__title}>
        <BreadCrumbs
          start={{ label: 'Vouchers', route: dashboardPaths.vouchers.slice(1) }}
          current={voucherData?.name || ''}
        />
        <div className={styles.voucher_view__buttons}>
          <Button view={ButtonView.red} onClick={onDeleteVoucherOpen}>
            Delete voucher
          </Button>

          <Button view={ButtonView.ghost} onClick={onEditVoucherClick}>
            Edit voucher
          </Button>
        </div>
      </section>

      <section className={styles.voucher_view__content}>
        <article className={styles.voucher_view__left}>
          <Section>
            <Typography.Title
              view={TitleView.small}
              className={styles.voucher_view__content_title}
            >
              Voucher content
            </Typography.Title>

            <List
              items={voucherContent || []}
              direction={ListDirection.horizontal}
            />
            {voucherData?.image ? (
              <div className={styles.voucher_view__content_image}>
                <Typography.Paragraph
                  view={ParagraphView.small}
                  color={ParagraphColor.gray}
                >
                  Voucher image
                </Typography.Paragraph>
                <picture>
                  <img
                    src={`data:${voucherData.image.data};base64,${voucherData.image.data}`}
                    alt={voucherData?.name}
                  />
                </picture>
              </div>
            ) : (
              <></>
            )}
          </Section>

          <Section>
            <Typography.Title
              view={TitleView.small}
              className={styles.voucher_view__table_title}
            >
              Redeemable products
            </Typography.Title>

            <Table
              thead={redeemableProductsTableHead}
              tbody={redeemableProductsRows}
              sortedFields={[0]}
              emptyState="No products yet..."
            />
          </Section>
        </article>
        <article className={styles.voucher_view__right}>
          <Section>
            <Typography.Title
              view={TitleView.small}
              className={styles.voucher_view__info_title}
            >
              Voucher information
            </Typography.Title>

            <List
              items={voucherInfo || []}
              direction={ListDirection.vertical}
            />
          </Section>
        </article>
      </section>
    </section>
  )
);

export default VoucherView;
