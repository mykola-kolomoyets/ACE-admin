import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import Typography from '../typography';

import { TitleView } from '../../utils/enums/typography';
import { dashboardPaths } from '../../utils/paths';
import { BreadCrumbsItem } from '../../utils/types/breadcrumb';

import styles from './breadcrumbs.module.scss';
import BreadCrumbArrowIcon from '../../icons/BreadCrumbArrow';

type BreadCrumbsProps = {
  start: BreadCrumbsItem;
  current: string;
};

const BreadCrumbs: FC<BreadCrumbsProps> = ({ start, current }) => {
  const navigate = useNavigate();

  const onStartBreadCrumbClick = () =>
    navigate(`${dashboardPaths.main}/${start.route}`);

  return (
    <section className={styles.breadcrumbs}>
      <Typography.Title
        view={TitleView.medium}
        isGhost
        className={styles.breadcrumbs__start}
        onClick={onStartBreadCrumbClick}
      >
        {start.label}
      </Typography.Title>

      <BreadCrumbArrowIcon />

      <Typography.Title view={TitleView.medium}>{current}</Typography.Title>
    </section>
  );
};

export default BreadCrumbs;
