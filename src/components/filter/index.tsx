import { FC } from 'react';
import cn from 'classnames';

import Typography from '../typography';

import { ParagraphColor, ParagraphView } from '../../utils/enums/typography';
import { Period } from '../../utils/enums/common';

import styles from './filter.module.scss';

type FilterProps = {
  activeFilter: string;
  onFilterChange: (period: Period) => void;
};

const Filter: FC<FilterProps> = ({ activeFilter, onFilterChange }) => (
  <div className={styles.filter}>
    {Object.values(Period).map((period) => (
      <div
        key={period}
        className={cn(styles.filter__item, {
          [styles.filter__item_active]: activeFilter === period
        })}
        onClick={() => onFilterChange(period)}
      >
        <Typography.Paragraph
          isBold
          view={ParagraphView.medium}
          color={ParagraphColor[activeFilter === period ? 'white' : 'gray']}
        >
          {period}
        </Typography.Paragraph>
      </div>
    ))}
  </div>
);

export default Filter;
