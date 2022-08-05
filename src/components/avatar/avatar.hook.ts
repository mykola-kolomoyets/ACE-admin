import { useState } from 'react';

import useProfileStore from '../../store/useProfileStore';

const useAvatarProps = () => {
  const { firstName, lastName, role } = useProfileStore();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const onAvatarClick = () => setIsDropdownOpen((prev) => !prev);

  const onClickOutside = () => setIsDropdownOpen(false);

  return {
    firstName,
    lastName,
    isDropdownOpen,
    onAvatarClick,
    onClickOutside,
    role
  };
};

export default useAvatarProps;
