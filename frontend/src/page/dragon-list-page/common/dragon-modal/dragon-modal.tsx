import { DragonResponseDto } from '../../../../constants/types/dragon/dragon-response-dto';
import { FC } from 'react';
import { Modal } from '../../../../components/common/modal/modal';
import { Icon } from '../../../../components/common/icon';
import { IconName } from '../../../../constants/enums/icon/icon-name/icon-name.enum';
import { IconColor } from '../../../../constants/enums/icon/icon-color/icon-color.enum';
import { MobileSwiper } from '../../../dragon-page/common/mobile-swipper';
import { SwiperSlide } from 'swiper/react';

import styles from '../../../dragon-page/style.module.scss';
import modalStyle from './style.module.scss';
import { Button } from '../../../../components/common/button/button';
import clsx from 'clsx';

type Props = {
  dragonData?: DragonResponseDto;
  onClose: { (): void };
  isOpen: boolean;
};

const DragonModal: FC<Props> = ({ dragonData, isOpen, onClose }) => {
  if (!dragonData) {
    return null;
  }

  const { flickr_images, name, wikipedia, height_w_trunk, dry_mass_kg, first_flight } = dragonData;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <MobileSwiper>
        {flickr_images?.map((image, index) => {
          return (
            <SwiperSlide key={`image-${index}`} className={styles['swiper-slide']}>
              <img src={image} alt={name as string} height={'500'} className={styles['carousel-image']} />
            </SwiperSlide>
          );
        })}
      </MobileSwiper>
      <h2 className={modalStyle['dragon-modal-header']}>{name}</h2>
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
      <div>
        <Button
          content={'Close'}
          onClick={onClose}
          className={clsx(styles['sign-out-btn'], modalStyle['close-modal-btn'])}
        />
      </div>
    </Modal>
  );
};

export { DragonModal };
