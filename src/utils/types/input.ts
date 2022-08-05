import { ComponentProps } from 'react';

import { Icon } from './icon';

export interface InputDefaultProps {
  label?: string;
  className?: string;
  errorMessage?: string;
  disabled?: boolean;
  placeholder?: string;
}

export interface InputProps extends InputDefaultProps {
  inputProps?: ComponentProps<'input'>;
  validate?: () => void;
  name?: string;
  Icon?: Icon;
  maxLength?: number;
}
