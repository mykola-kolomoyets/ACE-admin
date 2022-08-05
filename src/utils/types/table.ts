import { Icon } from './icon';

import { SortingDirection, TableCellTypes } from '../enums/table';
import { UserStatus } from '../enums/user';
import { VoucherStatus } from '../enums/voucher';

export type TableCell = {
  type: TableCellTypes;
  value: string;
  title?: string;
  onClick?: string;
  status?: UserStatus | VoucherStatus;
  withSign?: boolean;
  maxLength?: number;
  contentClasses?: string;
  withTooltip?: boolean;
  Icon?: Icon;
};

export type Row = {
  to?: string;
  cells: TableCell[];
};

export type TableProps = {
  thead?: string[];
  tbody?: Row[];
  className?: string;
  emptyState?: string;
  sortedFields?: number[];
};

export type SortConfig = {
  direction: SortingDirection;
  index: number;
} | null;
