import TableCellView from './table-cell';

import { Row } from '../../../utils/types/table';

import styles from './../table.module.scss';

export type TableRowProps = {
  items: Row['cells'];
  onClick?: () => void;
};

const TableRow = ({ items, onClick }: TableRowProps) => (
  <tr onClick={onClick} className={styles.table__body_row}>
    {items.map((item, index) => (
      <TableCellView key={item.type + index} {...item} />
    ))}
  </tr>
);

export default TableRow;
