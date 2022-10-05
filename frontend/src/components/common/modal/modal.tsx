import styles from './styles.module.scss';
import { FC, ReactNode } from 'react';
import { useModal } from './hooks/use-modal/use-modal.hook';
import { Portal } from '../portal/portal';
import clsx from 'clsx';

type Props = {
  children: ReactNode;
  isOpen: boolean;
  portalClassName?: string;
  modalClassName?: string;
  contentContainerClassName?: string;
  onClose: { (): void };
  isNeedHiddenOverflow?: boolean;
};

const Modal: FC<Props> = ({
  isOpen,
  isNeedHiddenOverflow = false,
  onClose,
  children,
  contentContainerClassName,
  portalClassName,
  modalClassName,
}) => {
  const { handleDisableContentContainerClick, handleOutsideClick } = useModal({
    onClose,
  });

  if (!isOpen) {
    return null;
  }

  return (
    <Portal className={portalClassName}>
      <div className={clsx(styles['modal-container'], modalClassName)} onClick={handleOutsideClick}>
        <div
          className={clsx(styles['modal-content-container'], contentContainerClassName)}
          style={{ overflow: isNeedHiddenOverflow ? 'hidden' : 'auto' }}
          onClick={handleDisableContentContainerClick}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};

export { Modal };
