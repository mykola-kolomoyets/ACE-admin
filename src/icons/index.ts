import { SVGProps } from 'react';

export type IconProps = {
  width?: string;
  height?: string;
  fill?: string;
  className?: string;
  onClick?: () => void;
  color?: string;
  rotate?: number;
} & Partial<SVGProps<SVGSVGElement>>;
