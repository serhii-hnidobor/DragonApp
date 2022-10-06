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
import { getCachedImg } from '../../helpers/get-cached-img/get-cached-img';
import { AppRoutes, IconColor, IconName, StorageKeys } from '../../constants/enums/enums';
import { Icon } from '../../components/common/icon';
import { NavLink } from '../../components/common/nav-link/nav-link';
import commonFormStyles from '../account-verification-page/form-controls.module.scss';
import { Navigation, Pagination } from 'swiper';
import { useWindowDimensions } from '../../hooks/use-window-dimension/use-window-dimension';
import { Loader } from '../../components/common/loader/loader';
import { ErrorBox } from '../../components/common/errors/errors';
import { MobileSwiper } from './common/mobile-swipper';
import { signOut } from '../../store/auth/actions';
import { Button } from '../../components/common/button/button';
import { CachedImg } from '../../components/common/cached-img/cached-img';

const DragonPage = (): ReactElement | null => {
  const dispatch = useAppDispatch();
  const [isDragonDataLoadedFromServer, setIsDragonDataLoadedFromServer] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number>();

  useEffect(() => {
    dispatch(getDragonData());
  }, [dispatch]);

  const { width } = useWindowDimensions();

  useEffect(() => {
    setScreenWidth(width);
  }, [width]);

  const dataStatus = useAppSelector((state) => {
    return state.dragon.data.mainDragon.dataStatus;
  });

  const handleSignOut = (): void => {
    dispatch(signOut());
  };

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

  if (dataStatus === DataStatus.PENDING) {
    return (
      <div className={styles['dragon-page-container']}>
        <div className={styles['dragon-page-content-wrapper']}>
          <Loader />
        </div>
      </div>
    );
  }

  if (dataStatus === DataStatus.REJECTED || !dragonData) {
    return (
      <div className={styles['dragon-page-container']}>
        <div className={styles['dragon-page-content-wrapper']}>
          <ErrorBox message={'oops something went wrong try refresh page'} />
        </div>
      </div>
    );
  }

  const isSmallScreen = (screenWidth as number) < 1270;

  const { flickr_images, name, wikipedia, description, height_w_trunk, dry_mass_kg, first_flight } = dragonData;

  const imagesElementsArray = flickr_images?.map((image, index) => {
    return (
      <SwiperSlide key={`image-${index}`} className={styles['swiper-slide']}>
        <CachedImg src={image} alt={name as string} height={'500'} className={styles['carousel-image']} />
      </SwiperSlide>
    );
  });

  return (
    <div className={styles['dragon-page-container']}>
      <div className={styles['dragon-page-content-wrapper']}>
        <h2 className={styles['dragon-page-main-header']}> Meet Dragon</h2>
        {isSmallScreen ? (
          <MobileSwiper>{imagesElementsArray}</MobileSwiper>
        ) : (
          <Swiper
            loop={true}
            navigation={true}
            autoHeight={true}
            pagination={true}
            className={styles['carousel']}
            modules={[Navigation, Pagination]}
          >
            {imagesElementsArray}
          </Swiper>
        )}
        <h3 className={styles['dragon-page-sub-header']}>{name}</h3>
        <div className={styles['dragon-description-wrapper']}>
          <p className={styles['dragon-description']}>{description}</p>
        </div>
        <div className={styles['dragon-info-container']}>
          <div className={styles['dragon-info-block']}>
            <Icon name={IconName.TAPEMEASURE} color={IconColor.WHITE} width={'50'} height={'50'} />
            <h3>Height</h3>
            <p>{height_w_trunk?.meters} m</p>
          </div>
          <div className={styles['dragon-info-block']}>
            <Icon name={IconName.WEIGHT} color={IconColor.WHITE} width={'50'} height={'50'} />
            <h3>Mass</h3>
            <p>{dry_mass_kg} kg</p>
          </div>
          <div className={styles['dragon-info-block']}>
            <Icon name={IconName.ROCKET} color={IconColor.WHITE} width={'50'} height={'50'} />
            <h3>First flight date</h3>
            <p>{first_flight}</p>
          </div>
          <div className={styles['dragon-info-block']}>
            <Icon name={IconName.IDEA} color={IconColor.WHITE} width={'50'} height={'50'} />
            <h3>Learn more</h3>
            <a href={wikipedia} target="_blank">
              Wiki
            </a>
          </div>
        </div>
        <NavLink
          linkTitle="View all dragon"
          prompt=""
          route={AppRoutes.DRAGON_LIST}
          className={commonFormStyles['upper-space-regular']}
        />
        <Button content={'Sign out'} onClick={handleSignOut} className={styles['sign-out-btn']} />
      </div>
    </div>
  );
};

export { DragonPage };
