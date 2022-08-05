/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState } from 'react';

import { DateUtils } from '../../utils/date.utils';
import { SortingDirection } from '../../utils/enums/table';
import { Row, SortConfig } from '../../utils/types/table';

/**
 * Hook to get table content sorted
 * @param {Array<Row>} items the data to be sorted
 * @param {SortConfig} config the index of column to be sorted and direction
 */
const useSortedTable = (items: Row[], config: SortConfig = null) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>(config);

  /**
   * Helping function to get the criteria number for sorting
   * for `Array.prototype.sort` function
   * @param {Number | String} current the one of the values to compare
   * @param {Number | String} next the other value to compare
   * @returns `1` or `-1` regarding to sort direction
   */
  const check = (current: number | string, next: number | string): number => {
    const isAscending = sortConfig?.direction === SortingDirection.ascending;

    if (current < next) return isAscending ? -1 : 1;

    if (current > next) return isAscending ? 1 : -1;

    return 0;
  };

  /**
   * Sorting function of comparing two rows
   * @param {Row} current the one of the values to compare
   * @param {Row} next the other value to compare
   * @returns `1` or `-1` regarding to sort direction
   */
  const sort = (current: Row, next: Row): number => {
    const index = sortConfig?.index || 0;

    const currentValue = current.cells[index]?.value;
    const nextValue = next.cells[index]?.value;

    /**
     *  if we sort the date string `DD-MM — DD-MM` pattern
     */
    if (currentValue?.toString()?.split(' — ')?.length === 2) {
      const currentStartDate = currentValue?.split(' — ')[0].split('-')[0];
      const nextStartDate = nextValue?.split(' — ')[0].split('-')[0];

      return check(+currentStartDate, +nextStartDate);
    }

    /**
     * If we sort the date string `DD-MM-YYYY` pattern
     */
    if (currentValue?.toString()?.split('-')?.length === 3) {
      const currentDate = DateUtils.stringToDate(currentValue).getTime();
      const nextDate = DateUtils.stringToDate(nextValue).getTime();

      return check(currentDate, nextDate);
    }

    /**
     * If we sort the date string `HH:MM` pattern
     */
    if (currentValue?.toString()?.split(':')?.length === 2) {
      const [hours, minutes] = currentValue.split(':');
      const [nextHours, nextMinutes] = nextValue.split(':');

      const currentTime = Number(hours) * 60 + Number(minutes);
      const nextTime = Number(nextHours) * 60 + Number(nextMinutes);

      return check(currentTime, nextTime);
    }

    return check(currentValue, next.cells[index]?.value);
  };

  const sortedItems = useMemo(() => {
    const sortableItems = [...items];

    if (!sortConfig) return;

    if (sortConfig.direction === SortingDirection.default) return sortableItems;

    sortableItems.sort((a: Row, b: Row) => sort(a, b));

    return sortableItems;
  }, [items, sortConfig]);

  /**
   * Function to set the sequence of sorting
   * `default` -> `ascending` -> `descending` -> `default`
   * @param {Number} index setting the index of column to sort
   */
  const requestSort = (index: number) => {
    if (!sortConfig)
      return setSortConfig({ index, direction: SortingDirection.default });

    if (sortConfig.direction === SortingDirection.default)
      return setSortConfig({ index, direction: SortingDirection.ascending });
    if (sortConfig.direction === SortingDirection.ascending)
      return setSortConfig({ index, direction: SortingDirection.descending });
    if (sortConfig.direction === SortingDirection.descending)
      return setSortConfig({ index, direction: SortingDirection.default });
  };

  return {
    items: sortedItems,
    requestSort,
    sortConfig
  };
};

export { useSortedTable };
