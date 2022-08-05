/* eslint-disable no-unused-vars */
import create from 'zustand';
import { Buffer } from 'buffer';

import VouchersService from '../api/services/vouchers.service';
import { VoucherStatus } from '../utils/enums/voucher';
import { Voucher } from '../utils/types/voucher';

import { limitStep } from '../views/vouchers/vouchers.constants';

window.Buffer = Buffer;

export type VouchersCategories = {
  [key in VoucherStatus]: number;
} & { all: number };

export const initialCategories = Object.values(VoucherStatus).reduce(
  (acc, curr) => ({ all: 0, ...acc, [curr]: 0 }),
  {}
) as VouchersCategories;

interface VouchersStore {
  skip: number;
  total: number;

  isFetching: boolean;

  status: keyof VouchersCategories | null;
  vouchers: Voucher[] | null;
  chosenVoucher: Voucher | undefined;
  categories: VouchersCategories;

  fetchVouchers: (
    skip: number,
    statusFilter?: keyof VouchersCategories
  ) => void;

  getVoucher: (id: string) => Promise<void>;

  resetChosenVoucher: () => void;
}

const useVouchersStore = create<VouchersStore>((set, get) => ({
  skip: 0,
  total: 0,

  isFetching: false,

  status: 'all',
  vouchers: null,
  chosenVoucher: undefined,
  categories: initialCategories,

  fetchVouchers: (skip, statusFilter) => {
    set({ skip, status: statusFilter, isFetching: true });

    VouchersService.getVouchers()
      .then((res) => {
        const vouchersCategoriesData: VouchersCategories = res.data.reduce(
          (acc, curr) => {
            return {
              ...acc,
              [curr.status]: +acc[curr.status] + 1,
              all: res.data.length
            };
          },
          { ...initialCategories }
        );

        let resultData = res.data;

        if (statusFilter !== 'all')
          resultData = resultData.filter(
            (voucher) => voucher.status === statusFilter
          );

        set({ total: resultData.length });

        resultData = resultData.slice(skip, skip + limitStep);

        set({
          categories: vouchersCategoriesData,
          vouchers: resultData
        });
      })
      .finally(() => set({ isFetching: false }));
  },

  async getVoucher(id) {
    set({ isFetching: true });

    await VouchersService.getVouchers()
      .then((res) => {
        set({ vouchers: res.data });

        const chosenVoucher = res.data.find((voucher) => voucher._id === id);

        set({ chosenVoucher });
      })
      .finally(() => set({ isFetching: false }));
  },

  resetChosenVoucher() {
    set({ chosenVoucher: undefined });
  }
}));

export default useVouchersStore;
