import { ListItemProps } from '../../components/list/list-item';
import { ListItemType } from '../../utils/enums/list';
import { TableCellTypes } from '../../utils/enums/table';
import { VoucherStatus } from '../../utils/enums/voucher';
import { Row } from '../../utils/types/table';
import { Voucher } from '../../utils/types/voucher';

export const redeemableProductsTableHead = ['Product name', 'Product price'];

export const mockVoucherData: Voucher = {
  _id: '1',
  createdAt: new Date(),
  updatedAt: new Date(),
  holder: 'Me',
  status: 'VALID',
  email: 'email1@com.com',
  name: 'Free COffee',
  image: {
    mimeType: 'image/jpeg',
    data: ''
  },
  redeemableProducts: [
    {
      productName: 'Coffee Americano',
      productPrice: 3
    },
    {
      productName: 'Coffee Cappuccino',
      productPrice: 3.5
    }
  ]
};

export const createRedeemableProductsRows = (
  data: Voucher['redeemableProducts']
): Row[] =>
  data.map((product) => ({
    cells: [
      {
        type: TableCellTypes.STRING,
        value: product.productName
      },
      {
        type: TableCellTypes.AMOUNT,
        value: product.productPrice.toString()
      }
    ]
  }));

export const createVoucherContent = (voucher: Voucher): ListItemProps[] => [
  {
    type: ListItemType.string,
    label: 'Voucher name',
    value: voucher.name
  },
  {
    type: ListItemType.date,
    label: 'Valid until',
    value: new Date(voucher.createdAt)
  },
  {
    type: ListItemType.string,
    label: 'Voucher holder',
    value: voucher.email
  }
];

export const createVoucherInfo = (voucher: Voucher): ListItemProps[] => [
  {
    type: ListItemType.status,
    label: 'Voucher status',
    value: VoucherStatus[voucher.status]
  },
  {
    type: ListItemType.string,
    label: 'Voucher ID',
    value: voucher._id
  },
  {
    type: ListItemType.string,
    label: 'Created by',
    value: voucher.email
  },
  {
    type: ListItemType.date,
    label: 'Created on',
    value: new Date(voucher.createdAt)
  }
];
