import { useEffect, useMemo, FC, ReactNode } from 'react';
import styles from './styles.module.scss';
import ReactDOM from 'react-dom';
import clsx from 'clsx';

type Props = {
  children: ReactNode;
  className?: string;
};
const Portal: FC<Props> = ({ children, className }) => {
  const portalContainer = useMemo(() => {
    const el = document.createElement('div');
    el.classList.add(styles.portal);

    return el;
  }, []);

  useEffect(() => {
    if (className) {
      portalContainer.classList.add(clsx(className));

      return (): void => {
        portalContainer.classList.remove(clsx(className));
      };
    }
  }, [className, portalContainer]);

  useEffect(() => {
    const wasOverflowHidden = document.body.classList.contains(styles['no-overflow']);
    document.body.appendChild(portalContainer);
    document.body.classList.add(styles['no-overflow']);

    return () => {
      document.body.removeChild(portalContainer);
      if (!wasOverflowHidden) {
        document.body.classList.remove(styles['no-overflow']);
      }
    };
  }, [portalContainer]);

  return ReactDOM.createPortal(children, portalContainer);
};

export { Portal };
