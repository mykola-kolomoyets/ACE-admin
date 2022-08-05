import { ReactNode, DetailedHTMLProps, HTMLAttributes } from 'react';

export type WithChildren = {
  children: ReactNode;
};

export type Label = {
  label: string;
  value: string;
};

export type ObjKeyValue = {
  [key: string]: unknown;
};

export type ObjWithKeys<T extends ObjKeyValue> = {
  [key: string]: T;
};

export type Detailed<T> = DetailedHTMLProps<HTMLAttributes<T>, T>;

export type PeriodAmount = {
  currentValue: number;
  previousValue: number;
};

export type ChartBadgeProps = {
  title: string;
  color: string;
};
