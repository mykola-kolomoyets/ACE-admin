import { ParagraphColor, ParagraphView } from '../../utils/enums/typography';
import { hoc } from '../../utils/hoc';

import Typography from '../typography';

import useInputProps from './input.hook';

import styles from './input.module.scss';

const Input = hoc(
  useInputProps,
  ({
    inputDefaultClasses,
    inputClasses,
    wrapperClasses,
    defaultInputProps,
    label,
    errorMessage,
    Icon
  }) => (
    <div className={inputDefaultClasses}>
      {label && (
        <label className={styles.input__label} htmlFor={label}>
          <Typography.Paragraph
            view={ParagraphView.small}
            color={ParagraphColor.gray}
          >
            {label}
          </Typography.Paragraph>
        </label>
      )}
      <div className={wrapperClasses}>
        {Icon && (
          <div className={styles.input__icon_wrapper}>
            <Icon />
          </div>
        )}
        <input {...defaultInputProps} className={inputClasses} />
      </div>

      {errorMessage && (
        <Typography.Paragraph
          view={ParagraphView.xSmall}
          className={styles.input__error}
          color={ParagraphColor.red}
        >
          {errorMessage}
        </Typography.Paragraph>
      )}
    </div>
  )
);

export default Input;
