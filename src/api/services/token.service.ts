import { AxiosResponse } from 'axios';

import Service from './../config';

import { Transaction } from '../../utils/types/transaction';

const paths = {
  main: '/token',

  getTransactions: '/get-transactions'
};

class TokenService extends Service<typeof paths> {
  constructor() {
    super(paths);
  }

  /**
   * Get all transactions API route
   * @param {String} startDate `DD-MM-YYYY` start of period to get transactions
   * @param {String} endDate `DD-MM-YYYY` end of period to get transactions
   */
  public getTransactions = (
    startDate: string,
    endDate: string
  ): Promise<AxiosResponse<Transaction[]>> =>
    this.tryRequest(() =>
      this.api.get(`${this.paths.main}${this.paths.getTransactions}`, {
        data: { startDate, endDate },
        headers: this.authHeader()
      })
    );
}

export default new TokenService();
