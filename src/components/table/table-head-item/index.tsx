import cn from 'classnames';

import Typography from '../../typography';

import ArrowGrayIcon from './../../../icons/ArrowRightGray';
import CircleIcon from './../../../icons/Circle';

import { ParagraphColor, ParagraphView } from '../../../utils/enums/typography';

import styles from './../table.module.scss';

export type TableHeadItemProps = {
  item: string;
  className?: string;
  onClick?: () => void;
};

const TableHeadItem = ({ item, className, onClick }: TableHeadItemProps) => (
  <td
    className={cn(styles.table__head_item, className)}
    title={item}
    onClick={onClick}
  >
    <Typography.Paragraph
      view={ParagraphView.small}
      color={ParagraphColor.gray}
    >
      <span>{item}</span>

      {className && className?.split(' ').includes('sort-default') && (
        <CircleIcon width="14px" height="14px" fill={'#DCDCDC'} />
      )}

      {className && !className?.split(' ').includes('sort-default') && (
        <ArrowGrayIcon
          width="16px"
          height="16px"
          className={cn({
            [styles.table__head_item_arrow_ascending]: className
              ?.split(' ')
              .includes('ascending'),
            [styles.table__head_item_arrow_descending]: className
              ?.split(' ')
              .includes('descending')
          })}
        />
      )}
    </Typography.Paragraph>
  </td>
);

export default TableHeadItem;
