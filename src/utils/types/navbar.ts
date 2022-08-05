/* eslint-disable no-unused-vars */
import { IconProps } from '../../icons';

export type NavbarItem = {
  label: string;
  Icon: (props: IconProps) => JSX.Element;
  to: string;
};
