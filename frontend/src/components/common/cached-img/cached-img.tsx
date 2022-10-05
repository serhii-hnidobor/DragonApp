import { FC } from 'react';
import { useImageCaching } from '../../../hooks/hooks';

type Props = {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  className?: string;
};

const CachedImg: FC<Props> = ({ src, alt, width, height, className }) => {
  const [ref, onLoad] = useImageCaching();
  return <img src={src} ref={ref} alt={alt} width={width} height={height} onLoad={onLoad} className={className} />;
};

export { CachedImg };
