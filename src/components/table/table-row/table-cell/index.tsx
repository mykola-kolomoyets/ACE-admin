/* eslint-disable @typescript-eslint/no-use-before-define */
import cn from 'classnames';
import NumberFormat from 'react-number-format';

import Typography from '../../../typography';

import { ParagraphView } from '../../../../utils/enums/typography';
import { UserStatus } from '../../../../utils/enums/user';
import {
  capitalize,
  createCuttedString,
  createSlicedString
} from '../../../../utils/fn';
import { TableCellTypes } from '../../../../utils/enums/table';
import { TableCell } from '../../../../utils/types/table';

import styles from './../../table.module.scss';
import { VoucherStatus } from '../../../../utils/enums/voucher';
import { Fragment } from 'react';

const renderSwitch = ({
  type,
  value,
  status,
  withSign,
  withTooltip,
  maxLength,
  contentClasses,
  Icon
}: TableCell) => {
  switch (type) {
    case TableCellTypes.STRING:
      return (
        <Typography.Paragraph
          view={ParagraphView.medium}
          className={cn(styles.table__string, contentClasses, {
            [styles.table__cell_with_tooltip]: withTooltip
          })}
          data-tooltip={value}
        >
          {value}
        </Typography.Paragraph>
      );

    case TableCellTypes.STRING_WITH_ICON:
      return (
        <div className={styles.table__cell_with_icon}>
          <Typography.Paragraph
            view={ParagraphView.medium}
            className={cn(styles.table__cell_string_with_icon, contentClasses, {
              [styles.table__cell_with_tooltip]: withTooltip
            })}
            data-tooltip={value}
          >
            {value}
          </Typography.Paragraph>
          {Icon ? <Icon /> : ''}
        </div>
      );

    case TableCellTypes.DATE:
      return (
        <Typography.Paragraph
          view={ParagraphView.medium}
          className={cn(styles.table__cell_date, contentClasses)}
        >
          {value}
        </Typography.Paragraph>
      );

    case TableCellTypes.AMOUNT:
      return (
        <Typography.Paragraph view={ParagraphView.medium}>
          {withSign ? (Number(value) > 0 ? '+' : '') : ''}

          <NumberFormat
            value={Number(value) || 0}
            displayType={'text'}
            decimalScale={2}
            fixedDecimalScale
            thousandSeparator="."
            decimalSeparator=","
          />
        </Typography.Paragraph>
      );

    case TableCellTypes.STATUS:
      return (
        <StatusCell
          contentClasses={contentClasses}
          value={value}
          status={status}
        />
      );

    case TableCellTypes.STRING_WITH_SLICE: {
      return (
        <Typography.Paragraph
          view={ParagraphView.medium}
          className={cn(styles.table__string, contentClasses, {
            [styles.table__cell_with_tooltip]: withTooltip
          })}
          data-tooltip={value}
        >
          {createSlicedString(value)}
        </Typography.Paragraph>
      );
    }

    case TableCellTypes.STRING_WITH_CUT: {
      return (
        <Typography.Paragraph
          view={ParagraphView.medium}
          className={cn(styles.table__string, contentClasses, {
            [styles.table__cell_with_tooltip]: withTooltip
          })}
          data-tooltip={value}
        >
          {createCuttedString(value, maxLength)}
        </Typography.Paragraph>
      );
    }

    default:
      return null;
  }
};

type StatusCellProps = Pick<TableCell, 'contentClasses' | 'value' | 'status'>;
export const StatusCell = ({
  contentClasses,
  value,
  status
}: StatusCellProps) => (
  <div className={cn(styles.table__cell_status_wrapper, contentClasses)}>
    <div
      className={cn(styles.table__cell_status, {
        [styles.table__cell_status_active]: status === UserStatus.active,
        [styles.table__cell_status_inactive]: status === UserStatus.inactive,
        [styles.table__cell_status_pending]: status === UserStatus.pending,

        [styles.table__cell_status_valid]: status === VoucherStatus.VALID,
        [styles.table__cell_status_redeemed]: status === VoucherStatus.REDEEMED,
        [styles.table__cell_status_expired]: status === VoucherStatus.EXPIRED
      })}
    ></div>

    <Typography.Paragraph view={ParagraphView.medium}>
      {capitalize(value)}
    </Typography.Paragraph>
  </div>
);

const TableCellView = (cellData: TableCell) => {
  const cellClasses = cn(styles.table__body_row_item);

  return <td className={cellClasses}>{renderSwitch(cellData)}</td>;
};

export default TableCellView;
