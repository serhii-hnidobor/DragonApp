import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { isBase64 } from '../../helpers/is-base64/is-base-64';
import { storageService } from '../../services/services';
import { CachedImg } from '../../constants/types/cached-img/cached-img';
import { StorageKeys } from '../../constants/enums/enums';

const useImageCaching = (): [MutableRefObject<HTMLImageElement>, VoidFunction, boolean] => {
  const [cached, setCached] = useState(false);
  const ref = useRef<HTMLImageElement>() as MutableRefObject<HTMLImageElement>;

  const cacheImg = (base64: string, src: string): void => {
    const curCachedImage: CachedImg[] | null = storageService.retrieve(StorageKeys.CACHED_IMG);

    if (!curCachedImage) {
      storageService.save(StorageKeys.CACHED_IMG, [{ src, base64 }]);
      setCached(true);
      return;
    }

    const isImageAlreadyCached = curCachedImage.findIndex((cached) => cached.src === src);

    if (isImageAlreadyCached === -1) {
      curCachedImage.push({
        base64,
        src,
      });
      storageService.save(StorageKeys.CACHED_IMG, curCachedImage);
    }

    curCachedImage[isImageAlreadyCached] = { src, base64 };
    storageService.save(StorageKeys.CACHED_IMG, curCachedImage);
  };
  const onLoad = (): void => {
    if (!ref.current || !ref.current.complete || cached) {
      return;
    }

    const { current: img } = ref;
    const { src } = img;

    if (!img || isBase64(src)) {
      return;
    }

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;
    try {
      context?.drawImage(img, 0, 0);
      const base64 = canvas.toDataURL('image/jpeg', 0.5);
      canvas.remove();
      cacheImg(base64, src);
    } catch {
      return;
    }
  };

  useEffect(() => {
    if (ref.current && ref.current.complete) {
      onLoad();
    }
  });

  useEffect(() => {
    if (ref.current.crossOrigin !== 'anonymous') {
      ref.current.crossOrigin = 'anonymous';
    }
  }, [ref]);

  return [ref, onLoad, cached];
};

export { useImageCaching };
