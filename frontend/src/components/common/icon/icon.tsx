import styles from './styles.module.scss';
import { IconName } from 'constants/enums/enums';
import { ReactComponent as Bell } from 'assets/img/bell.svg';

import clsx from 'clsx';
const getColor = (color: string): string => styles[`fill${color}`];

interface ISVGProps {
  color?: string;
  width?: string;
  height?: string;
}

interface IconProps {
  name: string;
  color: string;
  width: string;
  height: string;
  className?: string;
  onClick?: { (): void };
}

const defaultProps: ISVGProps = {
  color: '',
  width: '20',
  height: '20',
};

const Icon = ({ name, color, width, height, className, onClick }: IconProps): JSX.Element => {
  const commonProps = {
    className: clsx(getColor(color), className),
    width: width,
    height: height,
    onClick,
  };

  switch (name) {
    case IconName.BELL: {
      return <Bell {...commonProps} />;
    }

    default: {
      return <Bell {...commonProps} />;
    }
  }
};

Icon.defaultProps = defaultProps;

export { Icon };
