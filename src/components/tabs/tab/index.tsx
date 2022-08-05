import { ReactNode } from 'react';

export type TabProps = {
  title: string;
  id: string;
  rightAddons?: string | number;
  children: ReactNode;
};

const Tab = ({ children }: TabProps) => <section>{children}</section>;

export { Tab };
