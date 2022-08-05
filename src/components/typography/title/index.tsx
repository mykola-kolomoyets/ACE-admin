import { FC, ReactNode } from 'react';
import cn from 'classnames';

import { TitleView } from '../../../utils/enums/typography';
import { Detailed } from '../../../utils/types/common';

import styles from './../typography.module.scss';

type TitleProps = {
  view: TitleView;
  children?: ReactNode;
  className?: string;
  isGhost?: boolean;
  isCentered?: boolean;
} & Detailed<HTMLHeadingElement>;

const Title: FC<TitleProps> = ({
  view,
  children,
  className,
  isGhost,
  isCentered,
  ...props
}) => {
  const titleViewClasses = cn({
    [styles.title__view_small]: view === TitleView.small,
    [styles.title__view_medium]: view === TitleView.medium,
    [styles.title__view_large]: view === TitleView.large,
    [styles.title__ghost]: isGhost,
    [styles.title__centered]: isCentered
  });

  const titleClasses = cn(className, styles.title, titleViewClasses);

  if (view === TitleView.large)
    return (
      <h1 className={titleClasses} {...props}>
        {children}
      </h1>
    );

  return (
    <h4 className={titleClasses} {...props}>
      {children}
    </h4>
  );
};

export default Title;
