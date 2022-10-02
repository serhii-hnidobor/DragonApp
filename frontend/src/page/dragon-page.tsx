import { ReactElement, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getDragonData } from '../store/dragon/actions';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from './style.module.scss';
import { storageService } from '../services/services';
import { DragonResponseDto } from '../constants/types/dragon/dragon-response-dto';
import { DataStatus } from '../constants/enums/data-status/data-status';
import { CachedImg } from '../components/common/cached-img/cached-img';
import { getCachedImg } from '../helpers/get-cached-img/get-cached-img';
import { StorageKeys } from '../constants/enums/enums';

const DragonPage = (): ReactElement | null => {
  const dispatch = useAppDispatch();
  const [isDragonDataLoadedFromServer, setIsDragonDataLoadedFromServer] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getDragonData());
  }, [dispatch]);

  const dataStatus = useAppSelector((state) => {
    return state.dragon.data.mainDragon.dataStatus;
  });

  const dragonData = useAppSelector((state) => {
    const dragon = state.dragon.data.mainDragon;
    if (!isDragonDataLoadedFromServer || !dragon) {
      const cachedDragon = storageService.retrieve(StorageKeys.CACHED_DRAGON_DATA) as DragonResponseDto;
      const flickrImagesFromCache = getCachedImg(cachedDragon.flickr_images);
      return {
        ...cachedDragon,
        flickr_images: flickrImagesFromCache,
      };
    }
    return { ...dragon.data };
  });

  useEffect(() => {
    if (dataStatus === DataStatus.FULFILLED) {
      setIsDragonDataLoadedFromServer(true);
    }
  }, [dataStatus]);

  if (!dragonData) {
    return null;
  }

  const { flickr_images, name, wikipedia } = dragonData;

  return (
    <div>
      <h2 className={styles['dragon-page-main-header']}> Meet Dragon</h2>
      <Swiper
        lazy={true}
        pagination={{
          clickable: true,
        }}
        loop={true}
        navigation={true}
        autoHeight={true}
        modules={[Pagination, Navigation]}
        className={styles['carousel']}
        autoplay={true}
      >
        {flickr_images?.map((image, index) => {
          return (
            <SwiperSlide key={`image-${index}`} className={styles['swiper-slide']}>
              <CachedImg src={image} alt={name as string} height={'500'} />
              <div></div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <h3 className={styles['dragon-page-sub-header']}>{name}</h3>
      <a href={wikipedia}>Wiki</a>
    </div>
  );
};

export { DragonPage };
