/* eslint-disable react-hooks/exhaustive-deps */
import { useState, ChangeEvent, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import UserService from '../../api/services/user.service';
import VouchersService from '../../api/services/vouchers.service';

import useSummaryStore from '../../store/useSummaryStore';
import useVouchersStore from '../../store/useVouchersStore';

import { Option } from '../../components/select';

import { Roles } from '../../utils/enums/common';
import {
  VoucherValues,
  VoucherErrors,
  VoucherRequest,
  ActionVoucherRequest
} from '../../utils/types/voucher';
import {
  convertImageToBase64,
  getFileSizeInMB,
  getUserName
} from '../../utils/fn';
import { dashboardPaths } from '../../utils/paths';

import {
  defaultVoucherValues,
  defaultVoucherErrors,
  isUpdateVoucher,
  mockProducts
} from './voucher-edit-create.constants';
import { AxiosError } from 'axios';

const useEditCreateVoucher = () => {
  const { id } = useParams<'id'>();

  const { openSummary } = useSummaryStore();
  const { chosenVoucher, getVoucher } = useVouchersStore();

  const [holders, setHolders] = useState<Option[]>([]);

  const [values, setValues] = useState<VoucherValues>(defaultVoucherValues);
  const [imageFile, setImageFile] = useState<File>();

  const [errors, setErrors] = useState<VoucherErrors>(defaultVoucherErrors);

  const navigate = useNavigate();

  const onSummaryClose = () =>
    navigate(`${dashboardPaths.main}${dashboardPaths.vouchers}`);

  const onFieldUpdate = <T>(field: keyof VoucherValues, value: T) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const onNameChange = (event: ChangeEvent<HTMLInputElement>) =>
    onFieldUpdate('name', event.target.value);

  const onHolderChange = (selected: Option) =>
    onFieldUpdate('holder', selected);

  const onImageUpload = async (file?: File) => {
    if (file) {
      if (getFileSizeInMB(file) > 5) {
        return openSummary({
          isSuccess: false,
          title: 'Image cannot be uploaded',
          subtitle:
            'Image is too big. It has to be no more then 2MB size. Try to upload another image'
        });
      }

      setImageFile(file);
      await convertImageToBase64(file).then((res) =>
        onFieldUpdate('image', res)
      );
    }
  };

  const onDeleteImageClick = () => onFieldUpdate('image', null);

  const validate = (cb: () => void) => {
    const validateErrors = { ...defaultVoucherErrors };

    Object.entries(values).forEach(([key, value]) => {
      if (key !== 'redeemableProducts' && !value)
        validateErrors[
          key as keyof Pick<VoucherErrors, 'holder' | 'image' | 'name'>
        ] = 'Required';
    });

    validateErrors.redeemableProducts = values.redeemableProducts.length
      ? values.redeemableProducts.map((product) =>
          !product.productName ? 'Required' : ''
        )
      : ['Required'];

    if (
      Object.values(validateErrors).some((error) =>
        Array.isArray(error) ? error.some((value) => value.length) : error
      )
    )
      return setErrors(validateErrors);

    cb();
  };

  const onSubmit = () => {
    const isCreateVoucher = !id;

    validate(() => {
      const { redeemableProducts, holder, name } = values;

      const voucherData: VoucherRequest = {
        name,
        image: imageFile,
        holder: holder?.label || '',
        email: `${holder?.value}`,
        redeemableProducts
      };

      const dataForRequest: ActionVoucherRequest = id
        ? { id, data: voucherData }
        : { data: voucherData };

      const request = (data: ActionVoucherRequest) => {
        return isUpdateVoucher(data)
          ? VouchersService.updateVoucher(data)
          : VouchersService.createVoucher(data);
      };

      const action = isCreateVoucher ? 'create' : 'update';

      request(dataForRequest)
        .then(() => {
          openSummary({
            isSuccess: true,
            title: `Voucher ${name} was successfully ${action}d!`,
            closeButtonText: 'Back to vouchers',
            onCloseCallback: onSummaryClose
          });
        })
        .catch((err: AxiosError) => {
          console.log(err);

          openSummary({
            isSuccess: false,
            title: `Voucher ${name} was not ${action}d!`,
            subtitle: `Some error ocurred. Please, try to ${action} new voucher later`,
            onCloseCallback: onSummaryClose
          });
        });
    });
  };

  const onCancel = () =>
    navigate(`${dashboardPaths.main}${dashboardPaths.vouchers}`);

  const onAddRow = () => {
    setValues((prev) => ({
      ...prev,
      redeemableProducts: prev.redeemableProducts.concat({
        productName: '',
        productPrice: 0
      })
    }));
    setErrors((prev) => ({ ...prev, redeemableProducts: [] }));
  };

  const onDeleteRow = (index: number) => {
    setValues((prev) => ({
      ...prev,
      redeemableProducts: prev.redeemableProducts.filter(
        (_, idx) => index !== idx
      )
    }));

    setErrors((prev) => ({ ...prev, redeemableProducts: [] }));
  };

  const onRowNameChange = (index: number, selected: Option) => {
    setValues((prev) => ({
      ...prev,
      redeemableProducts: prev.redeemableProducts.map((item, idx) => {
        return {
          ...item,
          productName: index === idx ? selected.label : item.productName,
          productPrice:
            index === idx
              ? mockProducts.find((product) => product.id === selected.value)
                  ?.price || 0
              : item.productPrice
        };
      })
    }));

    setErrors((prev) => ({
      ...prev,
      redeemableProducts: prev.redeemableProducts.map((productError, idx) =>
        idx === index ? '' : productError
      )
    }));
  };

  useEffect(() => {
    UserService.getAllUsers().then((res) => {
      setHolders(
        res.data
          .filter((user) => Roles[user.role] === Roles.CUSTOMER)
          .map((user) => ({
            label: getUserName(user),
            value: user.email
          }))
      );
    });

    id && getVoucher(id);
  }, [id]);

  useEffect(() => {
    if (chosenVoucher) {
      const { email, holder, name, redeemableProducts } = chosenVoucher;

      setValues({
        holder: {
          label: holder,
          value: email
        },
        name,
        redeemableProducts,
        image: chosenVoucher?.image
          ? `data:${chosenVoucher?.image.mimeType};base64,${chosenVoucher?.image.data}`
          : ''
      });
    }
  }, [chosenVoucher]);

  return {
    id,

    mockProducts,
    holders,
    values,
    errors,

    onNameChange,
    onHolderChange,
    onImageUpload,
    onRowNameChange,
    onAddRow,
    onDeleteRow,
    onDeleteImageClick,
    onCancel,
    onSubmit
  };
};

export default useEditCreateVoucher;
