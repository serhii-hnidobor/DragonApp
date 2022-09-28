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
      <Swiper
        lazy={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Lazy, Pagination, Navigation]}
        className={styles['carousel']}
      >
        {flickr_images.map((image) => {
          return (
            <SwiperSlide>
              <img src={image} alt={name} className="swiper-lazy" />;
              <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <p>{name}</p>
      <a href={wikipedia}>Wiki</a>
    </div>
  );
};

export { DragonPage };
