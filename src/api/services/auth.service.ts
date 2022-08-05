import { AxiosResponse } from 'axios';
import { LoginFormValues } from '../../views/login';

import Service from '../config';

const paths = {
  main: '/auth',

  login: '/login',
  resetPassword: '/reset-password',
  changePassword: '/change-password'
};

class AuthService extends Service<typeof paths> {
  constructor() {
    super(paths);
  }

  /**
   * Login API route
   * @param {LoginFormValues} data - email and password to login
   * @see {@link LoginFormValues}
   */
  public login = (
    data: LoginFormValues
  ): Promise<AxiosResponse<{ token: string }>> =>
    this.api.post(`${this.paths.main}${this.paths.login}`, data);

  /**
   * Reset password API route
   * @param {String} email - email of account to reset password
   */
  public resetPassword = (email: string): Promise<void> =>
    this.api.post(`${this.paths.main}${this.paths.resetPassword}`, { email });

  /**
   * Change password API route
   * @param {String} password new password of logged-in-user
   * @param token auth token to pass in
   */
  public changePassword = (
    oldPassword: string,
    newPassword: string,
    token = ''
  ): Promise<void> =>
    this.api.post(
      `${this.paths.main}${this.paths.changePassword}`,
      {
        oldPassword,
        newPassword
      },
      {
        headers: this.authHeader({ token })
      }
    );
}

export default new AuthService();
