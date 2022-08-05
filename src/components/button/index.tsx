import { FC, Fragment, ReactNode } from 'react';
import cn from 'classnames';

import Typography from '../typography';

import { Icon } from '../../utils/types/icon';
import { ParagraphColor, ParagraphView } from '../../utils/enums/typography';
import { ButtonView } from '../../utils/enums/button';

import styles from './button.module.scss';

type ButtonProps = {
  view: ButtonView;
  LeftAddon?: Icon;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  isFullWidth?: boolean;
};

const buttonTextColors = {
  [ButtonView.primary]: ParagraphColor.white,
  [ButtonView.ghost]: ParagraphColor.gray,
  [ButtonView.link]: ParagraphColor.blue,
  [ButtonView.red]: ParagraphColor.red,
  [ButtonView.transparent]: ParagraphColor.gray,
  [ButtonView.fullRed]: ParagraphColor.white
};

const Button: FC<ButtonProps> = ({
  view,
  LeftAddon,
  children,
  disabled,
  onClick,
  isFullWidth
}) => {
  const buttonViewClasses = cn({
    [styles.button__view_primary]: view === ButtonView.primary,
    [styles.button__view_ghost]: view === ButtonView.ghost,
    [styles.button__view_link]: view === ButtonView.link,
    [styles.button__view_red]: view === ButtonView.red,
    [styles.button__view_transparent]: view === ButtonView.transparent,
    [styles.button__view_fullRed]: view === ButtonView.fullRed,

    [styles.button__disabled]: disabled,
    [styles.button__full_width]: isFullWidth
  });

  const onButtonClick = () => {
    if (onClick) onClick();
  };

  return (
    <button
      type="button"
      className={cn(styles.button, buttonViewClasses)}
      onClick={onButtonClick}
    >
      <Typography.Paragraph
        className={styles.button__content}
        view={ParagraphView.medium}
        color={buttonTextColors[view]}
        isBold
      >
        <Fragment>
          {LeftAddon ? (
            <LeftAddon
              fill={view === ButtonView.primary ? '#ffffff' : '#808080'}
            />
          ) : (
            ''
          )}
          {children}
        </Fragment>
      </Typography.Paragraph>
    </button>
  );
};

export default Button;
