import { FC, ReactNode } from 'react';
import styles from '../style.module.scss';
import { Pagination } from 'swiper';
import { Swiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

type Props = {
  children?: ReactNode;
};

const MobileSwiper: FC<Props> = ({ children }) => {
  return (
    <Swiper
      loop={true}
      navigation={false}
      autoHeight={true}
      direction={'vertical'}
      pagination={{
        clickable: true,
      }}
      className={styles['carousel']}
      modules={[Pagination]}
    >
      {children}
    </Swiper>
  );
};

export { MobileSwiper };
