import { FC, ReactElement } from 'react';
import styles from './style.module.scss';

type Props = {
  flickr_images: string[];
  name: string;
  description: string;
  onClick?: VoidFunction;
};

const DragonListItem: FC<Props> = ({ flickr_images, name, onClick, description }): ReactElement => {
  return (
    <div className={styles['dragon-list-item']}>
      <div className={styles['dragon-list-image']}>
        <img src={flickr_images[0]} alt={name} height={'200px'} />
      </div>
      <div className={styles['dragon-list-item-header-container']}>
        <span className={styles['dragon-list-item-header']}>{name}</span>
      </div>
      <div className={styles['dragon-list-item-description']}>{description}</div>
      <div className={styles['learn-more-container']}>
        <h3 onClick={onClick}>Learn more</h3>
      </div>
    </div>
  );
};

export { DragonListItem };
