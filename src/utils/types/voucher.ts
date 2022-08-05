import { VoucherStatus } from '../enums/voucher';
import { Option } from '../../components/select';

export type VoucherItem = {
  id: string;
  type: string;
  status: VoucherStatus;
  validUntil: Date;
};

export type Voucher = {
  createdAt: Date;
  email: string;
  holder: string;
  image: {
    data: string;
    mimeType: string;
  };
  name: string;
  redeemableProducts: RedeemableProduct[];
  status: keyof typeof VoucherStatus;
  _id: string;
  updatedAt: Date;
};

export type RedeemableProduct = {
  productName: string;
  productPrice: number;
};

export type VoucherValues = {
  name: string;
  holder: Option | null;
  image: string | null;
  redeemableProducts: RedeemableProduct[];
};

export type VoucherErrors = {
  name: string;
  holder: string;
  image: string;
  redeemableProducts: string[];
};

export type VoucherRequest = {
  name: string;
  holder: string;
  email: string;
  redeemableProducts: RedeemableProduct[];
  image?: File;
};

export type CreateVoucherRequest = {
  data: VoucherRequest;
};

export type UpdateVoucherRequest = {
  id: string;
  data: VoucherRequest;
};

export type ActionVoucherRequest = CreateVoucherRequest | UpdateVoucherRequest;
