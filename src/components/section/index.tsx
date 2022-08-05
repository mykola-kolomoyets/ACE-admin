import { FC } from 'react';
import cn from 'classnames';

import styles from './section.module.scss';

type SectionProps = {
  className?: string;
  children?: JSX.Element | JSX.Element[];
  paddingX?: number;
  paddingY?: number;
};

const Section: FC<SectionProps> = ({
  className,
  children,
  paddingX,
  paddingY
}) => {
  const paddingXStyles = paddingX
    ? { paddingTop: `${paddingX}px`, paddingBottom: `${paddingX}px` }
    : {};
  const paddingYStyles = paddingY
    ? { paddingLeft: `${paddingY}px`, paddingRight: `${paddingY}px` }
    : {};

  const paddingStyles = { ...paddingXStyles, ...paddingYStyles };
  return (
    <section className={cn(className, styles.section)} style={paddingStyles}>
      {children}
    </section>
  );
};

export default Section;
