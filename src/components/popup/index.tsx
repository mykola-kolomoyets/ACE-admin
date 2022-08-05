import Button from '../button';

import CloseIcon from '../../icons/Close';

import { ButtonView } from '../../utils/enums/button';
import { hoc } from '../../utils/hoc';

import { usePopup } from './popup.hook';
import styles from './popup.module.scss';

const Popup = hoc(
  usePopup,
  ({ onClose, children, visible, overlayRef, isClosable = true }) => {
    if (!visible) return null;

    return (
      <div className={styles.popup}>
        <div
          className={styles.popup__overlay}
          ref={isClosable ? overlayRef : null}
        ></div>
        <div className={styles.popup__content}>
          <section className={styles.popup__inner_content}>{children}</section>

          {onClose && isClosable && (
            <section className={styles.popup__close_button}>
              <Button view={ButtonView.transparent} onClick={onClose}>
                <CloseIcon />
              </Button>
            </section>
          )}
        </div>
      </div>
    );
  }
);

export default Popup;
