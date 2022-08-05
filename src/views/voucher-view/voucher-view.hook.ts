/* eslint-disable react-hooks/exhaustive-deps,@typescript-eslint/no-non-null-assertion */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import VouchersService from '../../api/services/vouchers.service';
import useSummaryStore from '../../store/useSummaryStore';
import useVouchersStore from '../../store/useVouchersStore';
import { dashboardPaths } from '../../utils/paths';

import { Row } from '../../utils/types/table';

import {
  createRedeemableProductsRows,
  createVoucherContent,
  createVoucherInfo,
  redeemableProductsTableHead
} from './voucher-view.constants';

const useVoucherView = () => {
  const { id } = useParams<'id'>();

  const { openSummary } = useSummaryStore();
  const { chosenVoucher, getVoucher } = useVouchersStore();

  const [redeemableProductsRows, setRedeemableProductsRows] = useState<Row[]>(
    []
  );

  const [isDeleteVoucherOpen, setIsDeleteVoucherOpen] = useState(false);

  const navigate = useNavigate();

  const voucherInfo = useMemo(
    () => chosenVoucher && createVoucherInfo(chosenVoucher),
    [chosenVoucher]
  );

  const voucherContent = useMemo(
    () => chosenVoucher && createVoucherContent(chosenVoucher),
    [chosenVoucher]
  );

  const onDeleteVoucherOpen = () => setIsDeleteVoucherOpen(true);
  const onDeleteVoucherClose = () => setIsDeleteVoucherOpen(false);

  const onEditVoucherClick = () =>
    navigate(
      `${dashboardPaths.main}${dashboardPaths.vouchers}${
        dashboardPaths.createUpdateVoucher
      }/${id!}`
    );

  const onSummaryClose = () =>
    navigate(`${dashboardPaths.main}${dashboardPaths.vouchers}`);

  const onDeleteVoucherClick = () => {
    VouchersService.deleteVoucher(id!)
      .then((res) => {
        openSummary({
          isSuccess: true,
          title: 'Voucher deleted',
          subtitle: 'All data associated with the voucher has been deleted.',
          closeButtonText: 'Return to Vouchers',
          onCloseCallback: onSummaryClose
        });
      })
      .catch((err) => {
        console.log(err);

        openSummary({
          isSuccess: false,
          title: 'Voucher was not deleted',
          closeButtonText: 'Return to Vouchers',
          onCloseCallback: onSummaryClose
        });
      });
  };

  useEffect(() => {
    chosenVoucher?.redeemableProducts.length &&
      setRedeemableProductsRows(
        createRedeemableProductsRows(chosenVoucher.redeemableProducts)
      );
  }, [chosenVoucher?.redeemableProducts]);

  useEffect(() => {
    id && getVoucher(id);
  }, [id]);

  return {
    voucherData: chosenVoucher,
    redeemableProductsTableHead,
    redeemableProductsRows,
    voucherInfo,
    voucherContent,

    isDeleteVoucherOpen,
    onDeleteVoucherOpen,
    onDeleteVoucherClose,

    onDeleteVoucherClick,
    onEditVoucherClick
  };
};

export default useVoucherView;
