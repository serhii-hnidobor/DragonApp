import { ReactElement, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getDragonData } from '../../store/dragon/actions';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from './style.module.scss';
import { storageService } from '../../services/services';
import { DragonResponseDto } from '../../constants/types/dragon/dragon-response-dto';
import { DataStatus } from '../../constants/enums/data-status/data-status';
import { CachedImg } from '../../components/common/cached-img/cached-img';
import { getCachedImg } from '../../helpers/get-cached-img/get-cached-img';
import { AppRoutes, IconColor, IconName, StorageKeys } from '../../constants/enums/enums';
import { Icon } from '../../components/common/icon';
import { NavLink } from '../../components/common/nav-link/nav-link';
import commonFormStyles from '../account-verification-page/form-controls.module.scss';

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
      if (!cachedDragon) {
        return;
      }
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

  const { flickr_images, name, wikipedia, description, height_w_trunk, dry_mass_kg, first_flight } = dragonData;

  return (
    <div className={styles['dragon-page-container']}>
      <div className={styles['dragon-page-content-wrapper']}>
        <h2 className={styles['dragon-page-main-header']}> Meet Dragon</h2>
        <Swiper loop={true} navigation={true} autoHeight={true} className={styles['carousel']} autoplay={true}>
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
        <div className={styles['dragon-description-wrapper']}>
          <p className={styles['dragon-description']}>{description}</p>
        </div>
        <div className={styles['dragon-info-container']}>
          <div className={styles['dragon-info-block']}>
            <Icon name={IconName.TAPEMEASURE} color={IconColor.WHITE} width={'50'} height={'50'} />
            <p>{height_w_trunk?.meters}</p>
          </div>
          <div className={styles['dragon-info-block']}>
            <Icon name={IconName.WEIGHT} color={IconColor.WHITE} width={'50'} height={'50'} />
            <p>{dry_mass_kg}</p>
          </div>
          <div className={styles['dragon-info-block']}>
            <Icon name={IconName.ROCKET} color={IconColor.WHITE} width={'50'} height={'50'} />
            <p>{first_flight}</p>
          </div>
          <div className={styles['dragon-info-block']}>
            <Icon name={IconName.BELL} color={IconColor.WHITE} width={'50'} height={'50'} />
            <a href={wikipedia}>Wiki</a>
          </div>
        </div>
        <NavLink
          linkTitle="View all dragon"
          prompt=""
          route={AppRoutes.DRAGON_LIST}
          className={commonFormStyles['upper-space-regular']}
        />
      </div>
    </div>
  );
};

export { DragonPage };
