import { FC } from 'react';

import Avatar from './../avatar';

import LogoIcon from '../../icons/Logo';

import styles from './header.module.scss';

type HeaderProps = {
  onLogoClick: () => void;
};
const Header: FC<HeaderProps> = ({ onLogoClick }) => (
  <header className={styles.header}>
    <LogoIcon
      width="106px"
      height="40px"
      cursor="pointer"
      onClick={onLogoClick}
    />
    <Avatar />
  </header>
);

export default Header;
