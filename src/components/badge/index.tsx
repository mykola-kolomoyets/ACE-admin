import { FC, Fragment } from 'react';
import NumberFormat from 'react-number-format';

import Typography from '../typography';

import ArrowRightGrayIcon from '../../icons/ArrowRightGray';
import ArrowDownRedIcon from '../../icons/ArrowDownRed';
import ArrowUpGreenIcon from '../../icons/ArrowUpGreen';

import { ParagraphColor, ParagraphView } from '../../utils/enums/typography';

import styles from './badge.module.scss';
import Spinner from '../../icons/Spinner';

type BadgeProps = {
  delta: number | null;
  isFetching?: boolean;
};

const Badge: FC<BadgeProps> = ({ delta, isFetching }) => {
  const deltaValue = delta ?? 0;

  let ArrowIcon = deltaValue === 0 ? ArrowRightGrayIcon : ArrowUpGreenIcon;
  if (deltaValue < 0) ArrowIcon = ArrowDownRedIcon;

  let textColor = deltaValue === 0 ? ParagraphColor.gray : ParagraphColor.green;

  if (deltaValue < 0) textColor = ParagraphColor.red;

  return (
    <div className={styles.badge}>
      {isFetching ? (
        <Spinner width="16" height="16" />
      ) : (
        <Fragment>
          <div className={styles.badge__icon}>
            <ArrowIcon />
          </div>

          <Typography.Paragraph view={ParagraphView.medium} color={textColor}>
            {deltaValue > 0 ? '+' : ''}
            <NumberFormat
              value={deltaValue}
              displayType={'text'}
              decimalScale={2}
              fixedDecimalScale
              thousandSeparator="."
              decimalSeparator=","
            />
            %
          </Typography.Paragraph>
        </Fragment>
      )}
    </div>
  );
};

export default Badge;
