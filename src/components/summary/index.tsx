import { FC } from 'react';

import useSummaryStore from '../../store/useSummaryStore';

import Button from '../button';
import Popup from '../popup';
import Typography from '../typography';

import FailIcon from './../../icons/Fail';
import SuccessIcon from './../../icons/Success';

import { ParagraphView, TitleView } from '../../utils/enums/typography';
import { ButtonView } from '../../utils/enums/button';

import './summary.scss';

const Summary: FC = () => {
  const { isShown, isSuccess, title, subtitle, closeButtonText } =
    useSummaryStore((store) => store.data);

  const { onCloseCallback, closeSummary } = useSummaryStore((store) => store);

  const onClose = () => {
    if (onCloseCallback) onCloseCallback();
    closeSummary();
  };

  return isShown ? (
    <Popup visible={isShown} onClose={onClose} isClosable>
      <div className="form-container">
        <div className="form form_summary">
          {isSuccess ? (
            <SuccessIcon width={'96px'} height={'96px'} />
          ) : (
            <FailIcon width={'96px'} height={'96px'} />
          )}

          <Typography.Title
            view={TitleView.medium}
            className="form__heading"
            isCentered
          >
            {title}
          </Typography.Title>

          <Typography.Paragraph
            view={ParagraphView.small}
            className="form__form__text"
            isCentered
          >
            {subtitle}
          </Typography.Paragraph>

          <Button view={ButtonView.ghost} onClick={onClose}>
            {closeButtonText || 'Close'}
          </Button>
        </div>
      </div>
    </Popup>
  ) : null;
};

export default Summary;
