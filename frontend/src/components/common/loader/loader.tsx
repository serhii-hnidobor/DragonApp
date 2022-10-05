import { FC } from 'react';
import { Rings } from 'react-loader-spinner';

type Props = {
  wrapperClassName?: string;
  width?: number;
  color?: string;
  height?: number;
  radius?: number;
};

const Loader: FC<Props> = ({ width, height, radius, color, wrapperClassName }) => {
  return (
    <Rings
      height={height || '80'}
      width={width || '80'}
      color={color || '#4fa94d'}
      radius={radius || '6'}
      wrapperClass={wrapperClassName}
      visible={true}
      ariaLabel="rings-loading"
    />
  );
};

export { Loader };
