import { storageService } from '../../services/services';
import { CachedImg } from '../../constants/types/cached-img/cached-img';

const getCachedImg = (imgSrcArray: string[]): string[] => {
  const cachedImages: string[] = [];
  const imgCache: CachedImg[] | null = storageService.retrieve('cached_img');
  if (!imgCache) {
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
