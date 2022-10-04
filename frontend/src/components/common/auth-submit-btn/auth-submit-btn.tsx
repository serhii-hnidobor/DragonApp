import React, { FC } from 'react';
import { Button } from 'components/common/common';
import styles from './styles.module.scss';
import clsx from 'clsx';

type Props = {
  isLoading: boolean;
  disabled: boolean;
  name: string;
  className?: string;
};

const AuthSubmitButton: FC<Props> = ({ isLoading, name, disabled, className }) => {
  return (
    <Button
      className={clsx(styles['auth-submit-btn'], isLoading && styles['no-hover'], className)}
      type="submit"
      content={name}
      disabled={disabled}
    />
  );
};

export { AuthSubmitButton };
