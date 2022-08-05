import { FC, ReactNode } from 'react';
import cn from 'classnames';

import { ParagraphView, ParagraphColor } from '../../../utils/enums/typography';
import { Detailed } from '../../../utils/types/common';

import styles from './../typography.module.scss';

export type ParagraphProps = {
  view: ParagraphView;
  isBold?: boolean;
  isCentered?: boolean;
  color?: ParagraphColor;
  children?: ReactNode;
  isBlackOnHover?: boolean;
  className?: string;
  ['data-tooltip']?: string;
} & Detailed<HTMLParagraphElement>;

const Paragraph: FC<ParagraphProps> = ({
  view,
  color,
  isBold,
  isCentered,
  isBlackOnHover,
  children,
  className,
  ...props
}) => {
  const paragraphViewClasses = cn({
    [styles.p__view_xxSmall]: view === ParagraphView.xxSmall,
    [styles.p__view_xSmall]: view === ParagraphView.xSmall,
    [styles.p__view_small]: view === ParagraphView.small,
    [styles.p__view_medium]: view === ParagraphView.medium,
    [styles.p__with_tooltip]: Boolean(props['data-tooltip'])
  });

  const paragpraphColorClasses = cn({
    [styles.p__color_black]: !color || color === ParagraphColor.black,
    [styles.p__color_white]: color === ParagraphColor.white,
    [styles.p__color_gray]: color === ParagraphColor.gray,
    [styles.p__color_red]: color === ParagraphColor.red,
    [styles.p__color_green]: color === ParagraphColor.green,
    [styles.p__color_blue]: color === ParagraphColor.blue
  });

  const paragraphDecorationClasses = cn({
    [styles.p__bold]: isBold,
    [styles.p__black_on_hover]: isBlackOnHover,
    [styles.p__centered]: isCentered
  });

  const paragraphClasses = cn(
    className,
    styles.p,
    paragraphViewClasses,
    paragpraphColorClasses,
    paragraphDecorationClasses
  );

  return (
    <p className={paragraphClasses} {...props}>
      {children}
    </p>
  );
};

export default Paragraph;
