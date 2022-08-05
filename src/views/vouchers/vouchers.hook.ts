/* eslint-disable react-hooks/exhaustive-deps,@typescript-eslint/no-non-null-assertion */
import { useEffect, useLayoutEffect, useState } from 'react';

import useNavbarStore from '../../store/useNavbarStore';
import useVouchersStore, {
  VouchersCategories
} from '../../store/useVouchersStore';

import { getCurrentTab } from '../../components/tabs/tabs.utils';

import { Label } from '../../utils/types/common';
import { Row } from '../../utils/types/table';

import {
  createVouchersRows,
  limitStep,
  vouchersTabs
} from './vouchers.constants';
import { useNavigate } from 'react-router-dom';
import { dashboardPaths } from '../../utils/paths';

const useVouchers = () => {
  const { setActiveItem } = useNavbarStore();
  const {
    isFetching: isVouchersFetching,
    skip,
    total,
    vouchers,
    status,
    categories,
    fetchVouchers,
    resetChosenVoucher
  } = useVouchersStore();

  const [isFetching, setIsFetching] = useState(false);

  const [showFromCount, setShowFromCount] = useState(1);

  const [selectedTab, setSelectedTab] = useState<Label>(vouchersTabs[status]);

  const [vouchersRows, setVouchersRows] = useState<Row[]>([]);

  const navigate = useNavigate();

  const onCreateVoucherClick = () =>
    navigate(
      `${dashboardPaths.main}${dashboardPaths.vouchers}${dashboardPaths.createUpdateVoucher}`
    );

  const onTabChange = (selected: string) => {
    setSelectedTab(getCurrentTab(vouchersTabs, selected)!);
  };

  const viewNewPage = (newSkip: number) => {
    fetchVouchers(newSkip, selectedTab.value as keyof VouchersCategories);
    setShowFromCount(newSkip + 1);
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

  useLayoutEffect(() => {
    fetchVouchers(0, selectedTab.value as keyof VouchersCategories);
  }, [selectedTab]);

  useEffect(() => {
    setActiveItem(2);
    resetChosenVoucher();
    fetchVouchers(skip, selectedTab.value as keyof VouchersCategories);
  }, []);

  useEffect(() => {
    setShowFromCount(skip ? skip + 1 : 1);
  }, [skip]);

  useEffect(() => {
    setVouchersRows(createVouchersRows(vouchers || []));
  }, [vouchers]);

  useEffect(() => {
    isVouchersFetching && setIsFetching(true);

    !isVouchersFetching &&
      setTimeout(() => {
        setIsFetching(false);
      }, 250);
  }, [isVouchersFetching]);

  return {
    isFetching,

    onCreateVoucherClick,

    vouchersRows,

    selectedTab,
    vouchersCategories: categories,
    skip,
    total,
    showFromCount,
    onTabChange,
    goNextPage,
    goPrevPage
  };
};

export default useVouchers;
