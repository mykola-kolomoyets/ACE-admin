import { FC, Fragment } from 'react';
import NumberFormat from 'react-number-format';

import Badge from '../badge';

import { ParagraphView, TitleView } from '../../utils/enums/typography';
import { showDeltaPercents } from '../../utils/fn';
import { SummaryLabel } from '../../utils/types/summary';

import Typography from '../typography';

import styles from './summary-item.module.scss';
import Spinner from '../../icons/Spinner';

const SummaryItem: FC<SummaryLabel> = ({
  amount,
  label,
  Icon,
  isWithDecimalPart,
  isWithBadge,
  isFetching
}) => {
  const { currentValue, previousValue } = amount;

  const delta = showDeltaPercents(currentValue, previousValue);

  return (
    <div className={styles.summary_item}>
      <div className={styles.summary_item__title}>
        <Typography.Paragraph view={ParagraphView.medium} isBold>
          {label}
        </Typography.Paragraph>
      </div>

      <div className={styles.summary_item__amount}>
        <Fragment>
          <Typography.Title view={TitleView.large}>
            {isFetching ? (
              <Spinner width="32" height="32" />
            ) : (
              <NumberFormat
                value={currentValue}
                displayType={'text'}
                decimalScale={isWithDecimalPart ? 2 : 0}
                fixedDecimalScale
                thousandSeparator="."
                decimalSeparator=","
              />
            )}
          </Typography.Title>

          {isWithBadge && <Badge delta={delta} isFetching={isFetching} />}
        </Fragment>
      </div>

      <div className={styles.summary_item__icon}>
        <Icon />
      </div>
    </div>
  );
};

export default SummaryItem;
