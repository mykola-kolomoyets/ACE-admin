import { useNavigate } from 'react-router-dom';

import AccountIcon from '../../icons/Account';
import LogoIcon from '../../icons/Logout';

import { authPaths, dashboardPaths } from '../../utils/paths';
import { DropdownItem } from '../../utils/types/dropdown';

type useDropdownProps = {
  onBlurCallback?: () => void;
};

const useDropdown = ({ onBlurCallback }: useDropdownProps) => {
  const navigate = useNavigate();

  const onAccountClick = () =>
    navigate(`${dashboardPaths.main}${dashboardPaths.profile}`);

  const onLogoutClick = () => {
    localStorage.removeItem('profile-storage');
    navigate(`${authPaths.main}${authPaths.login}`);
  };

  const dropdownItems: DropdownItem[] = [
    {
      label: 'My account',
      Icon: AccountIcon,
      callback: onAccountClick
    },
    {
      label: 'Logout',
      Icon: LogoIcon,
      callback: onLogoutClick
    }
  ];

  return {
    dropdownItems,
    onBlurCallback
  };
};

export default useDropdown;
