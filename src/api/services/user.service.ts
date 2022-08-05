import { AxiosResponse } from 'axios';

import Service from '../config';

import { Roles } from '../../utils/enums/common';
import { User, UserData } from '../../utils/types/user';

const paths = {
  main: '/user',

  getAllUsers: '/all',

  deactivateUser: '/block',
  reactivateUser: '/unblock',

  deleteUser: '/delete',

  inviteUsers: '/invite',

  createCashier: '/create-cashier',
  createAdmin: '/create-admin',

  updateUser: '/update',

  getUserTransactions: '/transactions'
};

class UserService extends Service<typeof paths> {
  constructor() {
    super(paths);
  }

  /**
   * Get all platform users API route
   */
  public getAllUsers = (): Promise<AxiosResponse<User[]>> =>
    this.tryRequest(() =>
      this.api.get(`${this.paths.main}${this.paths.getAllUsers}`, {
        headers: this.authHeader()
      })
    );

  /**
   * Get all platform users count API route
   * @returns number of users in platform
   */
  public getAllUsersCount = (): number => {
    try {
      this.getAllUsers().then((res) => {
        const { data } = res;

        return data.length;
      });
    } catch (err) {
      console.log(err);
      return 0;
    }

    return 0;
  };

  /**
   * Get the data of particular user API route
   * @param {String} userId identify number of user in DB
   * @returns {UserData} chosen user data (transactions, vouchers, common info)
   */
  public getUser = (userId: string): Promise<AxiosResponse<UserData>> =>
    this.api.get(`${this.paths.main}/${userId}`, {
      headers: this.authHeader()
    });

  /**
   * Deactivate user API route
   * @param {String} userId identify number of user in DB
   */
  public deactivateUser = (userId: string): Promise<AxiosResponse<string>> =>
    this.tryRequest(() =>
      this.api.patch(
        `${this.paths.main}${this.paths.deactivateUser}/${userId}`,
        {},
        {
          headers: this.authHeader()
        }
      )
    );

  /**
   * Reactivate user API route
   * @param {String} userId identify number of user in DB
   */
  public reactivateUser = (userId: string): Promise<AxiosResponse<string>> =>
    this.tryRequest(() =>
      this.api.patch(
        `${this.paths.main}${this.paths.reactivateUser}/${userId}`,
        {},
        {
          headers: this.authHeader()
        }
      )
    );

  /**
   * Delete user API route
   * @param {String} userId identify number of user in DB
   */
  public deleteUser = (userId: string): Promise<AxiosResponse<string>> =>
    this.tryRequest(() =>
      this.api.delete(`${this.paths.main}${this.paths.deleteUser}/${userId}`, {
        headers: this.authHeader()
      })
    );

  /**
   * Inviting users API route
   * @param {Array<String>} emails e-mails of users to invite
   * @param {Roles} role the role these users are invited in
   */
  public inviteUsers = (
    emails: string[],
    role: keyof typeof Roles
  ): Promise<void> =>
    this.tryRequest(() =>
      this.api.post(
        `${this.paths.main}${this.paths.inviteUsers}`,
        {
          emails,
          role
        },
        { headers: this.authHeader() }
      )
    );

  /**
   * Update logged User API route
   * @param {Pick<User, "firstName" | "lastName" | "email">} data the common data of user to update
   */
  public updateUser = (
    data: Pick<User, 'firstName' | 'lastName' | 'email'>
  ): Promise<void> =>
    this.tryRequest(() =>
      this.api.patch(`${this.paths.main}${this.paths.updateUser}`, data, {
        headers: this.authHeader()
      })
    );

  /**
   * Update particular User API route
   * @param {String} userId identify number of user in DB
   * @param {Pick<User, "firstName" | "lastName" | "email">} data the common data of user to update
   */
  public updateUserById = (
    userId: string,
    data: Pick<User, 'firstName' | 'lastName' | 'email' | 'role'>
  ): Promise<void> =>
    this.tryRequest(() =>
      this.api.patch(
        `${this.paths.main}${this.paths.updateUser}/${userId}`,
        data,
        {
          headers: this.authHeader()
        }
      )
    );
}

export default new UserService();
