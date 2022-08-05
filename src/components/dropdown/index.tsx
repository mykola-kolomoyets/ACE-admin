import Typography from './../typography';

import { ParagraphColor, ParagraphView } from '../../utils/enums/typography';
import { hoc } from '../../utils/hoc';

import useDropdown from './dropdown.hook';
import styles from './dropdown.module.scss';

const Dropdown = hoc(useDropdown, ({ dropdownItems, onBlurCallback }) => (
  <section className={styles.dropdown} onBlur={onBlurCallback}>
    {dropdownItems.map(({ Icon, label, callback }) => (
      <div key={label} className={styles.dropdown__item} onClick={callback}>
        <Typography.Paragraph
          className={styles.dropdown__label}
          view={ParagraphView.medium}
          color={ParagraphColor.gray}
          isBlackOnHover
        >
          <span className={styles.dropdown__image}>
            <Icon />
          </span>

          {label}
        </Typography.Paragraph>
      </div>
    ))}
  </section>
));

export default Dropdown;
