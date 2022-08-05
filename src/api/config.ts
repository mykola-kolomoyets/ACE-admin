/* eslint-disable no-unused-vars */
import axios, { AxiosInstance } from 'axios';
import { StatusCodes } from 'http-status-codes';

import { authPaths } from '../utils/paths';

const { REACT_APP_API_URL } = process.env;

type AuthHeader = {
  token?: string;
  isFormData?: boolean;
};

/**
 * Class to create new API services
 */
export default class Service<T, THelper = Record<string, unknown>> {
  /**
   * @property {AxiosInstance} api the instance to call HTTP requests
   * @protected
   */
  protected api: AxiosInstance;

  constructor(
    protected readonly paths: T,
    protected readonly helper?: THelper
  ) {
    this.api = axios.create({
      baseURL: REACT_APP_API_URL,
      headers: this.defaultHeader
    });
  }

  /**
   * @property {HTTPHeader} defaultHeader define the default JSON content-type header
   * @private
   */
  private defaultHeader = {
    'Content-type': 'application/json'
  };

  /**
   * @property {HTTPHeader} formDataHeader define the form-data content-type header
   * @private
   */
  private formDataHeader = {
    'Content-Type': 'multipart/form-data'
  };

  /**
   * @property {HTTPHeader} authHeader define the header with AuthToken
   * @protected
   */

  protected authHeader = ({ token, isFormData }: AuthHeader = {}) => ({
    ...(isFormData ? this.formDataHeader : this.defaultHeader),
    Authorization: `Bearer ${token || Service.getAuthToken()}`
  });

  /**
   * @property {Function} getAuthToken method to get AuthToken from LocalStorage
   * @returns {String | null} token | null
   * @static
   */
  public static getAuthToken = () => {
    const storage = localStorage.getItem('profile-storage');

    if (!storage) return null;

    const {
      state: { token }
    } = JSON.parse(storage);

    return token;
  };

  /**
   * @property {Promise} tryRequest method to bound the errors by try/catch block
   * @param {U} req the request itself
   * @returns {Promise | null} the response of request or callback onerror
   */
  protected tryRequest = async <U extends () => any>(req: U) => {
    try {
      return await req();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        switch (err.response.status) {
          case StatusCodes.UNAUTHORIZED: {
            window.location.href = `${authPaths.main}${authPaths.login}`;
            break;
          }
          default: {
            return err.response.status;
          }
        }
      }
    }
  };
}
