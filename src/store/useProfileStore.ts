/* eslint-disable no-unused-vars */
import create, { StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

import jwt_decode from 'jwt-decode';

import { Roles } from '../utils/enums/common';

interface ProfileStore {
  token: string;
  firstName: string;
  lastName: string;
  role: keyof typeof Roles;
  email: string;

  setToken: (token: string) => void;
  setProfileData: () => void;
  updateProfileData: (data: Partial<ProfileStoreData>) => void;
}

type ProfileStoreData = Omit<
  ProfileStore,
  'setToken' | 'setProfileData' | 'updateProfileData'
>;

type TokenData = {
  name: string;
} & Pick<ProfileStore, 'email' | 'role'>;

type ProfilePersist = (
  config: StateCreator<ProfileStore>,
  options: PersistOptions<ProfileStore>
) => StateCreator<ProfileStore>;

const defaultProfileState: ProfileStoreData = {
  token: '',
  firstName: 'string',
  lastName: '',
  role: 'CUSTOMER',
  email: ''
};

const useProfileStore = create<ProfileStore>(
  (persist as unknown as ProfilePersist)(
    (set, get) => ({
      ...defaultProfileState,

      setToken: (token: string) => {
        set((prev) => ({ ...prev, token }));
      },

      setProfileData: () => {
        const { token } = get();

        if (!token) {
          return set((prev) => ({ ...prev, ...defaultProfileState }));
        }

        const { email, name, role } = jwt_decode<TokenData>(token);

        const [firstName, lastName] = name.split(' ');

        set((prev) => ({ ...prev, email, role, firstName, lastName }));
      },

      updateProfileData: (data) => set(data)
    }),
    { name: 'profile-storage' }
  )
);

export default useProfileStore;
