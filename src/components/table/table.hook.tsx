import cn from 'classnames';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TableRow from './table-row';

import { TableProps, Row } from '../../utils/types/table';
import { SortingDirection } from '../../utils/enums/table';

import { useSortedTable } from './table.utils';
import styles from './table.module.scss';

const useTableProps = ({
  thead,
  tbody,
  className,
  emptyState,
  sortedFields
}: TableProps) => {
  const [defaultRows, setDefaultRows] = useState<Row[]>(tbody || []);
  const [rows, setRows] = useState<Row[]>(tbody || []);

  const navigate = useNavigate();

  const [isSorting, setIsSorting] = useState(false);

  const sortingConfig = sortedFields
    ? {
        index: sortedFields[0],
        direction: SortingDirection.default
      }
    : null;

  const { items, requestSort, sortConfig } = useSortedTable(
    tbody || [],
    sortingConfig
  );

  const isSortedColumn = (index: number) => sortConfig?.index === index;

  const getColumnClassName = (name: string): string => {
    let resultClasses = cn(styles.table__head__item);

    if (sortConfig) {
      if (
        thead &&
        thead[sortConfig.index].toLowerCase() === name.toLowerCase()
      ) {
        resultClasses = cn(
          resultClasses,
          isSorting ? sortConfig.direction : SortingDirection.default
        );
      }
    }

    return resultClasses;
  };

  const onRequestSort = (index: number) => {
    setIsSorting(true);
    requestSort(index);
  };

  const createRows = (data: Row[]) => {
    if (!data) return [];

    return data.map(({ cells, to }, index) => {
      const onClick = () => to && navigate(to);

      if (cells?.length)
        return <TableRow key={index} items={cells} onClick={onClick} />;

      return null;
    });
  };

  useEffect(() => {
    if (isSorting && sortConfig?.direction === SortingDirection.default) {
      setRows(tbody || []);
    } else {
      const currentRows: Row[] =
        isSorting && sortConfig && items ? items : tbody || [];
      setRows(currentRows);
    }

    setDefaultRows(tbody || []);
  }, [items, tbody, sortConfig, isSorting]);

  return {
    sortConfig,
    defaultRows,
    rows,
    thead,
    tbody,
    className,
    emptyState,
    sortedFields,
    getColumnClassName,
    isSortedColumn,
    onRequestSort,
    createRows
  };
};

export default useTableProps;
