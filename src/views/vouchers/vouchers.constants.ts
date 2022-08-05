/* eslint-disable no-unused-vars */
import { VouchersCategories } from '../../store/useVouchersStore';

import { DateUtils } from '../../utils/date.utils';
import { TableCellTypes } from '../../utils/enums/table';
import { VoucherStatus } from '../../utils/enums/voucher';
import { capitalize } from '../../utils/fn';
import { dashboardPaths } from '../../utils/paths';
import { Label } from '../../utils/types/common';
import { Row } from '../../utils/types/table';
import { Voucher } from '../../utils/types/voucher';

export const limitStep = 10;

export const vouchersTableHead = [
  'Voucher ID',
  'Voucher name',
  'Voucher holder',
  'Valid until',
  'Status'
];

export type VouchersTabs = {
  [key in keyof VouchersCategories]: Label;
};

export const vouchersTabs: VouchersTabs = {
  all: {
    label: 'All',
    value: 'all'
  },
  EXPIRED: {
    label: 'Expired',
    value: VoucherStatus.EXPIRED
  },
  REDEEMED: {
    label: 'Expired',
    value: VoucherStatus.REDEEMED
  },
  VALID: {
    label: 'Expired',
    value: VoucherStatus.VALID
  }
};

export const createVouchersRows = (data: Voucher[]): Row[] =>
  data.map((voucher) => ({
    to: `${dashboardPaths.main}${dashboardPaths.vouchers}/${voucher._id}`,
    cells: [
      {
        type: TableCellTypes.STRING_WITH_SLICE,
        value: voucher._id
      },
      {
        type: TableCellTypes.STRING,
        value: voucher.name
      },
      {
        type: TableCellTypes.STRING,
        value: voucher.email
      },
      {
        type: TableCellTypes.DATE,
        value: DateUtils.dateToString(new Date(voucher.createdAt))
      },
      {
        type: TableCellTypes.STATUS,
        value: capitalize(VoucherStatus[voucher.status]),
        status: VoucherStatus[voucher.status]
      }
    ]
  }));
