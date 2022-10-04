import { storageService } from '../../services/services';
import { CachedImg } from '../../constants/types/cached-img/cached-img';
import { StorageKeys } from '../../constants/enums/storage/storage';

const getCachedImg = (imgSrcArray: string[]): string[] => {
  const cachedImages: string[] = [];
  const imgCache: CachedImg[] | null = storageService.retrieve(StorageKeys.CACHED_IMG);
  if (!imgCache || !imgSrcArray) {
    return imgSrcArray;
  }
  imgSrcArray.map((src) => {
    const imgFromCache = imgCache.find((cachedImage) => cachedImage.src === src);
    if (imgFromCache) {
      cachedImages.push(imgFromCache.base64);
      return;
    }
    cachedImages.push(src);
  });
  return cachedImages;
};

export { getCachedImg };
