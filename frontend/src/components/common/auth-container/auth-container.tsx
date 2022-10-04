import styles from './styles.module.scss';
import { ReactNode, FC } from 'react';
import clsx from 'clsx';

type Props = {
  pageTitle: 'Sign in' | 'Sign up' | 'Restore password' | 'Account Verification';
  topLevelErrorComponent?: ReactNode | undefined;
  children: ReactNode;
  className?: string;
};

const AuthContainer: FC<Props> = ({ children, pageTitle, className, topLevelErrorComponent }) => {
  return (
    <div className={clsx(styles['auth-background'], className)}>
      <div className={styles['auth-modal']}>
        <div className={styles['auth-container']}>
          <div className={styles['auth-header']}>
            <h1 className={styles['auth-title']}>{pageTitle}</h1>
          </div>
          {topLevelErrorComponent}
          {children}
        </div>
      </div>
    </div>
  );
};

export { AuthContainer };
