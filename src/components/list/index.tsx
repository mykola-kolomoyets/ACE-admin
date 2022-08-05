import { FC } from 'react';
import cn from 'classnames';

import ListItem, { ListItemProps } from './list-item';

import { ListDirection } from '../../utils/enums/list';
import { Detailed } from '../../utils/types/common';

import styles from './list.module.scss';

type ListProps = {
  items: ListItemProps[];
  direction?: ListDirection;
} & Detailed<HTMLUListElement>;

const List: FC<ListProps> = ({
  items,
  direction = ListDirection.vertical,
  className,
  ...props
}) => {
  if (!items) return null;

  const listClasses = cn(styles.list, className, {
    [styles.list__vertical]: direction === ListDirection.vertical,
    [styles.list__horizontal]: direction === ListDirection.horizontal
  });

  return (
    <ul className={listClasses} {...props}>
      {items.map((item) => (
        <ListItem key={item.label} {...item} />
      ))}
    </ul>
  );
};

export default List;
