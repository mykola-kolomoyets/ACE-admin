/* eslint-disable no-unused-vars */
import create from 'zustand';

interface NavbarStore {
  activeItem: number | null;

  setActiveItem: (active: number | null) => void;
}

const useNavbarStore = create<NavbarStore>((set) => ({
  activeItem: 0,

  setActiveItem: (active) => set({ activeItem: active })
}));

export default useNavbarStore;
