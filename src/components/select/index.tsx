/* eslint-disable no-unused-vars */
import { useState, useRef, memo } from 'react';
import classNames from 'classnames';

import './select.scss';
import { InputDefaultProps } from '../../utils/types/input';
import SelectArrowIcon from '../../icons/SelectArrow';
import Typography from '../typography';
import { ParagraphColor, ParagraphView } from '../../utils/enums/typography';

export type Option = {
  value: string | number;
  label: string;
};

export interface SelectProps extends InputDefaultProps {
  options: Option[];
  value: Option | null;
  onChange: (v: Option) => void;
}

const Select = ({
  className,
  label,
  options,
  errorMessage,
  value,
  placeholder,
  onChange,
  disabled
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectRef = useRef<HTMLDivElement>(null);

  const toggling = () => {
    if (isOpen && value?.value) onChange({ label: '', value: '' });
    if (!disabled) setIsOpen(!isOpen);
  };
  const open = () => !disabled && setIsOpen(true);

  const isOptionActive = (option: Option) => {
    if (!value) return false;

    return option.value === value.value;
  };

  const onOptionClicked = (selectedOption: Option) => {
    setIsOpen(false);

    if (!isOptionActive(selectedOption)) onChange(selectedOption);
  };

  const selectWrapperClasses = classNames('select', className, {
    select_opened: isOpen
  });

  const selectedOptionClasses = classNames('select__selected-option', {
    'select__selected-option_placeholder':
      isOpen || (!value?.label && placeholder),
    select_disabled: disabled
  });

  const selectContainerClasses = classNames('select__container', {
    'select__container-with-error': errorMessage
  });

  const liClasses = (option: Option) =>
    classNames('select__option', {
      'select__option-active': isOptionActive(option)
    });

  return (
    <div className={selectWrapperClasses}>
      {label && <label className="label">{label}</label>}

      <div className={selectContainerClasses} ref={selectRef}>
        <div className={selectedOptionClasses} onClick={toggling}>
          <Typography.Paragraph
            view={ParagraphView.medium}
            color={ParagraphColor[!value?.label ? 'gray' : 'black']}
          >
            {!isOpen && value?.label ? value?.label : placeholder}
          </Typography.Paragraph>
          {
            <SelectArrowIcon
              width="16px"
              height="16px"
              rotate={isOpen ? 0 : 180}
              onClick={open}
            />
          }
        </div>

        {isOpen && (
          <div className="select__list-container">
            {options?.length ? (
              <ul className="select__list">
                {options.map((option, index) => (
                  <li
                    className={liClasses(option)}
                    onClick={() => onOptionClicked(option)}
                    key={index}
                  >
                    <p>{option.label}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No elements...</p>
            )}
          </div>
        )}
      </div>

      {errorMessage && <span className="select__error">{errorMessage}</span>}
    </div>
  );
};

export default memo(Select);
