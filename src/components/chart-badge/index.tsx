import { FC } from 'react';

import { ParagraphColor, ParagraphView } from '../../utils/enums/typography';
import { ChartBadgeProps } from '../../utils/types/common';

import Typography from '../typography';

import styles from './chart-badge.module.scss';

const ChartBadge: FC<ChartBadgeProps> = ({ title, color }) => (
  <Typography.Paragraph
    view={ParagraphView.medium}
    color={ParagraphColor.gray}
    className={styles.chart_badge}
  >
    <span style={{ backgroundColor: color }}></span>
    {title}
  </Typography.Paragraph>
);

export default ChartBadge;