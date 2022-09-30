import { FC } from 'react';
import { useImageCaching } from '../../../hooks/hooks';

type Props = {
  src: string;
  alt: string;
  width?: string;
  height?: string;
};

const CachedImg: FC<Props> = ({ src, alt, width, height }) => {
  const [ref, onLoad] = useImageCaching();
  return <img src={src} ref={ref} alt={alt} width={width} height={height} onLoad={onLoad} />;
};

export { CachedImg };
