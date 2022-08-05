import { IconProps } from '../../icons';

export type DropdownItem = {
  label: string;
  Icon: (props: IconProps) => JSX.Element;
  callback: () => void;
};
