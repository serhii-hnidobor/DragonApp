import { ReactElement, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getDragonData } from '../store/dragon/actions';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Lazy, Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/lazy';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from './style.module.scss';

const DragonPage = (): ReactElement | null => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDragonData());
  }, [dispatch]);

  const dragonData = useAppSelector((state) => state.dragon.data.list);

  if (!dragonData[0]) {
    return null;
  }

  const { flickr_images, name, wikipedia } = dragonData[0];

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
        modules={[Lazy, Pagination, Navigation]}
        className={styles['carousel']}
        autoplay={true}
      >
        {flickr_images.map((image) => {
          return (
            <SwiperSlide key={image} className={styles['swiper-slide']}>
              <img src={image} alt={name} className="swiper-lazy" />
              <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
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
