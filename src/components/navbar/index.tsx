import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import useNavbarStore from '../../store/useNavbarStore';

import Typography from './../typography';

import DashboardIcon from './../../icons/Dashboard';
import VoucherIcon from '../../icons/Voucher';
import UsersIcon from './../../icons/Users';

import { ParagraphColor, ParagraphView } from '../../utils/enums/typography';
import { dashboardPaths } from '../../utils/paths';
import { NavbarItem } from '../../utils/types/navbar';

import styles from './navbar.module.scss';

const Navbar = () => {
  const { activeItem, setActiveItem } = useNavbarStore();

  const navigate = useNavigate();

  const onNavLinkClick = (index: number, to: string) => {
    setActiveItem(index);
    navigate(to);
  };

  const navbarItems: NavbarItem[] = [
    {
      label: 'Dashboard',
      Icon: DashboardIcon,
      to: `${dashboardPaths.main}${dashboardPaths.dashboard}`
    },
    {
      label: 'Users',
      Icon: UsersIcon,
      to: `${dashboardPaths.main}${dashboardPaths.users}`
    },
    {
      label: 'Vouchers',
      Icon: VoucherIcon,
      to: `${dashboardPaths.main}${dashboardPaths.vouchers}`
    }
  ];

  return (
    <nav className={styles.navbar}>
      <ul>
        {navbarItems.map(({ Icon, label, to }, index) => (
          <li
            key={to}
            className={cn(styles.navbar__item, {
              [styles.navbar__item_active]: activeItem === index
            })}
            onClick={() => onNavLinkClick(index, to)}
          >
            <Icon />
            <Typography.Paragraph
              view={ParagraphView.medium}
              color={ParagraphColor.gray}
              isBlackOnHover
            >
              {label}
            </Typography.Paragraph>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
