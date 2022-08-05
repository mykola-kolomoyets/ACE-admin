/* eslint-disable no-unused-vars */
import { IconProps } from '../../icons';
import { PeriodAmount } from './common';

export type SummaryLabel = {
  amount: PeriodAmount;
  label: string;
  Icon: (props: IconProps) => JSX.Element;
  isWithDecimalPart?: boolean;
  isWithBadge?: boolean;
  isFetching: boolean;
};

export type Summary = {
  tokensMinted: PeriodAmount;
  transactionVolume: PeriodAmount;
  activeUsers: PeriodAmount;
};
