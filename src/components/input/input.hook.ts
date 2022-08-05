/* eslint-disable react-hooks/exhaustive-deps */
import { DetailedHTMLProps, InputHTMLAttributes, useMemo, useRef } from 'react';
import cn from 'classnames';

import { InputProps } from '../../utils/types/input';

import styles from './input.module.scss';

const useInputProps = ({
  label,
  errorMessage,
  name,
  className,
  Icon,
  maxLength,
  disabled,
  inputProps
}: InputProps) => {
  const inputDefaultClasses = cn(styles.input, className, {
    [styles.input__with_label]: label,
    [styles.input__with_error]: Boolean(errorMessage)
  });

  const inputClasses = cn(styles.input__control, {
    [styles.input__control_with_icon]: Icon,
    ...(inputProps?.className && {
      [inputProps?.className]: Boolean(inputProps.className)
    })
  });

  const wrapperClasses = cn(styles.input__wrapper, {
    [styles.input__wrapper_with_error]: Boolean(errorMessage)
  });

  const defaultProps: Pick<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'className' | 'id' | 'placeholder' | 'maxLength' | 'disabled'
  > = useMemo(
    () => ({
      className: styles.input__control,
      id: label || inputProps?.placeholder,
      placeholder: inputProps?.placeholder || label,
      maxLength: maxLength || 50,
      disabled
    }),
    [inputProps?.value, disabled, inputProps?.placeholder]
  );

  const defaultInputProps: Partial<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  > = {
    ...defaultProps,
    type: 'text',
    ...inputProps,
    name,
    className: cn(inputDefaultClasses, inputClasses)
  };

  return {
    inputDefaultClasses,
    inputClasses,
    wrapperClasses,
    defaultInputProps,
    label,
    errorMessage,
    name,
    className,
    Icon,
    maxLength,
    disabled,
    inputProps,
    value: inputProps?.value,
    placeholder: inputProps?.placeholder
  };
};

export default useInputProps;
