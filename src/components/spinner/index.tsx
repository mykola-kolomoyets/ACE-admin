import { FC } from 'react';

import SpinnerIcon from '../../icons/Spinner';

import styles from './spinner.module.scss';

const Spinner: FC = () => (
  <section className={styles.spinner}>
    <SpinnerIcon width="32" height="32" />
  </section>
);

export default Spinner;
