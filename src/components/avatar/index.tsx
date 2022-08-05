import { ParagraphColor, ParagraphView } from '../../utils/enums/typography';
import { Roles } from '../../utils/enums/common';
import { hoc } from '../../utils/hoc';

import Typography from './../typography';
import Dropdown from '../dropdown';

import userAvatar from './assets/Avatar.png';

import useAvatarProps from './avatar.hook';
import styles from './avatar.module.scss';

const Avatar = hoc(
  useAvatarProps,
  ({
    firstName,
    lastName,
    isDropdownOpen,
    onAvatarClick,
    onClickOutside,
    role
  }) => (
    <div
      className={styles.avatar}
      onMouseEnter={onAvatarClick}
      onMouseLeave={onClickOutside}
    >
      <div className={styles.avatar__image}>
        <img src={userAvatar} alt={`${firstName} - ${role}`} />
      </div>

      <div className={styles.avatar__user}>
        <Typography.Paragraph
          view={ParagraphView.xSmall}
          color={ParagraphColor.gray}
        >
          {firstName} {lastName}
        </Typography.Paragraph>

        <Typography.Paragraph
          view={ParagraphView.xxSmall}
          color={ParagraphColor.gray}
        >
          {Roles[role]}
        </Typography.Paragraph>
      </div>

      {isDropdownOpen && (
        <div className={styles.dropdown}>
          <Dropdown />
        </div>
      )}
    </div>
  )
);

export default Avatar;
