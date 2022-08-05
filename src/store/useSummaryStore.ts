/* eslint-disable no-unused-vars */
import create from 'zustand';

interface SummaryStore {
  data: {
    isShown: boolean;
    isSuccess: boolean;
    title: string;
    subtitle?: string;
    closeButtonText?: string;
  };

  openSummary: (
    data: Omit<SummaryStore['data'], 'isShown'> & {
      onCloseCallback?: () => void;
    }
  ) => void;
  closeSummary: () => void;
  onCloseCallback: () => void;
}

const defaultSummaryState: SummaryStore['data'] = {
  isShown: false,
  isSuccess: true,
  title: '',
  subtitle: '',
  closeButtonText: 'Close'
};

const useSummaryStore = create<SummaryStore>((set) => ({
  data: defaultSummaryState,

  openSummary: ({ onCloseCallback, ...data }) => {
    set((prev) => ({
      ...prev,
      data: { isShown: true, ...data },
      onCloseCallback: onCloseCallback ? onCloseCallback : () => null
    }));
  },

  closeSummary: () => {
    set((prev) => ({
      ...prev,
      data: defaultSummaryState,
      onCloseCallback: () => null
    }));
  },

  onCloseCallback: () => null
}));

export default useSummaryStore;
