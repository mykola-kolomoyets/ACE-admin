import { FC } from 'react';

import Button from '../button';
import Typography from '../typography';

import ArrowLeft from '../../icons/ArrowLeft';
import ArrowRight from '../../icons/ArrowRight';

import { ParagraphColor, ParagraphView } from '../../utils/enums/typography';
import { ButtonView } from '../../utils/enums/button';
import { PaginationProps } from '../../utils/types/pagination';

import styles from './pagination.module.scss';

const Pagination: FC<PaginationProps> = ({
  from,
  to,
  total,
  delta,
  showNext,
  showPrev,
  disabledPrev,
  disabledNext
}) => {
  const onNextClick = () => {
    if (showNext) showNext();
    window.scrollTo(0, 0);
  };

  const onPrevClick = () => {
    if (showPrev) showPrev();
    window.scrollTo(0, 0);
  };

  const pageTo = to > total ? total : to;

  return (
    <div className={styles.pagination}>
      <div className={styles.pagination__counter}>
        <Typography.Paragraph
          view={ParagraphView.medium}
          color={ParagraphColor.gray}
        >{`Showing ${from} to ${to} of ${total} results`}</Typography.Paragraph>
      </div>

      {total > delta ? (
        <div className={styles.pagination__controls}>
          <Button
            view={ButtonView.ghost}
            onClick={onPrevClick}
            disabled={
              disabledPrev !== undefined
                ? disabledPrev || pageTo === delta
                : pageTo === delta
            }
          >
            <ArrowLeft
              className={styles.pagination__left_arrow}
              width="16px"
              height="16px"
            />

            {`Prev ${delta}`}
          </Button>

          <Button
            view={ButtonView.ghost}
            onClick={onNextClick}
            disabled={disabledNext || false}
          >
            {`Next ${delta}`}

            <ArrowRight
              className={styles.pagination__right_arrow}
              width="16px"
              height="16px"
            />
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default Pagination;
