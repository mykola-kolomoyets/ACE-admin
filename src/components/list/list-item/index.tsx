import { FC, useState } from 'react';
import NumberFormat from 'react-number-format';
import cn from 'classnames';

import { StatusCell } from '../../table/table-row/table-cell';
import Typography from '../../typography';

import CopyIcon from '../../../icons/Copy';

import { DateUtils } from '../../../utils/date.utils';
import { ParagraphColor, ParagraphView } from '../../../utils/enums/typography';
import { UserStatus } from '../../../utils/enums/user';
import { Roles } from '../../../utils/enums/common';
import { createSlicedString } from '../../../utils/fn';
import { ListItemType } from '../../../utils/enums/list';

import styles from './../list.module.scss';
import useNotificationStore from '../../../store/useNotificationStore';
import { NotificationType } from '../../../utils/enums/notification';

export type ListItemProps = {
  type: ListItemType;
  label: string;
  value: string | UserStatus | Date | Roles;
};

const ListItem: FC<ListItemProps> = ({ type, label, value }) => (
  <li className={styles.list_item}>
    <Typography.Paragraph
      view={ParagraphView.small}
      color={ParagraphColor.gray}
    >
      {label}
    </Typography.Paragraph>

    <ListItemContent {...{ value, label, type }} />
  </li>
);

const ListItemContent: FC<Pick<ListItemProps, 'type' | 'value' | 'label'>> = ({
  type,
  value,
  label
}) => {
  const [iconClasses, setIconClasses] = useState('');

  const showNotification = useNotificationStore().showNotification;

  switch (type) {
    case ListItemType.string: {
      return (
        <Typography.Paragraph view={ParagraphView.medium}>
          {value as string}
        </Typography.Paragraph>
      );
    }

    case ListItemType.status: {
      return (
        <StatusCell value={value as string} status={value as UserStatus} />
      );
    }

    case ListItemType.date: {
      return (
        <Typography.Paragraph view={ParagraphView.medium}>
          {DateUtils.dateToString(new Date(value), false)}
        </Typography.Paragraph>
      );
    }

    case ListItemType.amount: {
      return (
        <Typography.Paragraph view={ParagraphView.medium}>
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
    }

    case ListItemType.string_to_copy: {
      const onClick = async () => {
        await navigator.clipboard.writeText(value as string);

        showNotification(
          NotificationType.info,
          `${label.toLowerCase()} was copied`
        );

        setIconClasses(cn(styles.list_item__copy_active));

        await setTimeout(() => {
          setIconClasses('');
        }, 1000);
      };

      return (
        <div onClick={onClick}>
          <Typography.Paragraph
            view={ParagraphView.medium}
            className={styles.list_item__copy}
          >
            <CopyIcon className={iconClasses} />
            {createSlicedString(value as string)}
          </Typography.Paragraph>
        </div>
      );
    }
  }
};

export default ListItem;
