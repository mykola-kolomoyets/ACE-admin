import {
  ActionVoucherRequest,
  UpdateVoucherRequest,
  VoucherErrors,
  VoucherValues
} from '../../utils/types/voucher';

export const isUpdateVoucher = (
  data: ActionVoucherRequest
): data is UpdateVoucherRequest => Boolean((data as UpdateVoucherRequest).id);

export const defaultVoucherValues: VoucherValues = {
  name: '',
  holder: null,
  image: null,
  redeemableProducts: []
};

export const defaultVoucherErrors: VoucherErrors = {
  name: '',
  holder: '',
  image: '',
  redeemableProducts: []
};

export const mockProducts = [
  {
    id: '1',
    name: 'Coffee Americano',
    price: 12
  },
  {
    id: '2',
    name: 'Coffee Cappuccino',
    price: 20
  },
  {
    id: '3',
    name: 'Coffee Espresso',
    price: 10
  },
  {
    id: '4',
    name: 'Sandwich Olala',
    price: 15
  }
];
