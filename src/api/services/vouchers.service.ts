import { AxiosResponse } from 'axios';

import Service from '../config';

import {
  CreateVoucherRequest,
  UpdateVoucherRequest,
  Voucher
} from '../../utils/types/voucher';

import VoucherHelper from '../helpers/vouchers.helper';

const paths = {
  main: '/voucher',
  getAllVouchers: '/all',

  createVoucher: '/',
  updateVoucher: '/'
};

class VouchersService extends Service<typeof paths, VoucherHelper> {
  constructor() {
    super(paths, new VoucherHelper());
  }

  /**
   * Getting vouchers array API route
   * @returns {Promise<AxiosResponse<Voucher[]>>} promise with array of vouchers
   */
  public getVouchers = (): Promise<AxiosResponse<Voucher[]>> =>
    this.tryRequest(() =>
      this.api.get(`${this.paths.main}${this.paths.getAllVouchers}`, {
        headers: this.authHeader()
      })
    );

  /**
   * Getting the particular voucher data API route
   * @param {String} id identify number of voucher in DB
   * @returns {Promise<AxiosResponse<Voucher>>} promise with complex voucher data
   */
  public getVoucher = (id: string): Promise<AxiosResponse<Voucher>> =>
    this.tryRequest(() =>
      this.api.get(`${this.paths.main}/${id}`, { headers: this.authHeader() })
    );

  /**
   * Deleting voucher API route
   * @param {String} id identify number of voucher in DB
   */
  public deleteVoucher = (id: string): Promise<void> =>
    this.tryRequest(() =>
      this.api.delete(`${this.paths.main}/${id}`, {
        headers: this.authHeader()
      })
    );

  /**
   * Create Voucher API route
   * @param {CreateVoucherRequest} data info about voucher
   */
  public createVoucher = ({ data }: CreateVoucherRequest): Promise<void> => {
    const formData = this.helper?.getFormData(data);

    return this.tryRequest(() =>
      this.api.post(`${this.paths.main}${this.paths.createVoucher}`, formData, {
        headers: this.authHeader({ isFormData: true })
      })
    );
  };

  /**
   * Update voucher API route
   * @param {String} id ID of voucher
   * @param { UpdateVoucherRequest } data data to update
   */
  public updateVoucher = ({
    id,
    data
  }: UpdateVoucherRequest): Promise<void> => {
    const formData = this.helper?.getFormData(data);

    return this.tryRequest(() =>
      this.api.patch(
        `${this.paths.main}${this.paths.createVoucher}${id}`,
        formData,
        {
          headers: this.authHeader({ isFormData: true })
        }
      )
    );
  };
}

export default new VouchersService();
