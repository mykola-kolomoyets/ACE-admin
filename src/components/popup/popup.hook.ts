/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useLayoutEffect, useRef, ReactNode } from 'react';

import { disableScroll, enableScroll } from '../../utils/fn';
import { PopupForm } from '../../utils/types/popup';

export interface PopupProps extends PopupForm {
  children: ReactNode | ReactNode[];
  isClosable: boolean;
}

export const usePopup = ({
  onClose,
  children,
  visible,
  isClosable
}: Partial<PopupProps>) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (visible) disableScroll();
    else enableScroll();

    return () => {
      enableScroll();
    };
  }, [visible]);

  useEffect(() => {
    if (onClose) overlayRef.current?.addEventListener('click', onClose);

    return () => {
      if (onClose) overlayRef.current?.removeEventListener('click', onClose);
    };
  });

  return { onClose, children, visible, overlayRef, isClosable };
};
