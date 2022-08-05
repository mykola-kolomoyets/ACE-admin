import { FC } from 'react';
import classNames from 'classnames';

import './radio.scss';

import { ComponentProps } from 'react';
import { Option } from '../select';

export type RadioProps = {
  name?: string;
  items: Option[];
  value?: string | null;
  label?: string;
  className?: string;
  inputProps?: ComponentProps<'input'>;
};

const Radio: FC<RadioProps> = ({
  items,
  label,
  inputProps,
  className,
  value
}) => {
  const classes = classNames('radio', className, {});

  const radioContainerClasses = (itemValue: string) =>
    classNames('radio__container text', {
      radio__container_active: value === itemValue,
      radio__container_disabled: inputProps?.disabled
    });

  return (
    <div className={classes}>
      {label && <label className="radio__label label">{label}</label>}
      <div className="radio__inputs-wrapper">
        {items.map(({ label: itemLabel, value: itemValue }, index) => (
          <label
            key={index}
            className={radioContainerClasses(itemValue.toString())}
          >
            {itemLabel}
            <input
              {...inputProps}
              className="radio__input"
              type="radio"
              checked={value === itemValue}
              value={itemValue}
            />
            <span
              className={classNames('radio__checkmark', {
                radio__checkmark_disabled: inputProps?.disabled
              })}
            ></span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Radio;
