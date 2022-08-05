import cn from 'classnames';

import Typography from '../typography';
import TableHeadItem from './table-head-item';

import { hoc } from '../../utils/hoc';
import { ParagraphView } from '../../utils/enums/typography';
import { SortingDirection } from '../../utils/enums/table';

import useTableProps from './table.hook';
import styles from './table.module.scss';

const Table = hoc(
  useTableProps,
  ({
    sortConfig,
    defaultRows,
    rows,
    thead,
    className,
    emptyState,
    getColumnClassName,
    isSortedColumn,
    onRequestSort,
    createRows
  }) =>
    !rows?.length && emptyState ? (
      <div>
        <Typography.Paragraph view={ParagraphView.medium}>
          {emptyState}
        </Typography.Paragraph>
      </div>
    ) : (
      // <section className={styles.table__container}>
      <table className={cn(styles.table, className)} cellSpacing="0">
        <thead className={styles.table__head}>
          <tr className={styles.table__head_row}>
            {thead.map((item, index) => (
              <TableHeadItem
                key={item + index}
                className={getColumnClassName(item)}
                item={item}
                {...(isSortedColumn(index)
                  ? { onClick: () => onRequestSort(index) }
                  : {})}
              />
            ))}
          </tr>
        </thead>
        <tbody className={styles.table__body}>
          {createRows(
            sortConfig?.direction === SortingDirection.default
              ? defaultRows
              : rows
          )}
        </tbody>
      </table>
      // </section>
    )
);

export default Table;
