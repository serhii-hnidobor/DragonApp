import { ReactElement, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getDragonList } from '../../store/dragon/actions';
import { DragonListItem } from './common/dragon-list-item-component';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { DataStatus } from '../../constants/enums/data-status/data-status';
import styles from './style.module.scss';
import { Loader } from '../../components/common/loader/loader';
import { ErrorBox } from '../../components/common/errors/errors';
import { NavLink } from '../../components/common/nav-link/nav-link';
import { AppRoutes } from '../../constants/enums/app/routes/routes';
import { DragonModal } from './common/dragon-modal/dragon-modal';

const DragonListPage = (): ReactElement | null => {
  const dispatch = useAppDispatch();
  const [isNeedDragonModal, setIsNeedDragonModal] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getDragonList(1));
  }, [dispatch]);

  const {
    list: dragonList,
    error,
    dataStatus,
    currentPage,
    lastPage,
  } = useAppSelector((state) => {
    return state.dragon.data;
  });

  const loadMore = (): void => {
    dispatch(getDragonList(currentPage + 1));
  };

  const isLoading = dataStatus === DataStatus.PENDING;
  const hasNextPage = currentPage < lastPage;

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: !!error,
    rootMargin: '0px 0px 400px 0px',
  });

  if (dataStatus === DataStatus.REJECTED) {
    return (
      <div className={styles['dragon-list-page-container']}>
        <div className={styles['dragon-list-page-table']}>
          <ErrorBox message={error} />;
        </div>
      </div>
    );
  }

  const handleModalClose = (): void => {
    setIsNeedDragonModal(false);
  };

  const handleDragonListItemClick = (): void => {
    setIsNeedDragonModal(true);
  };

  return (
    <div className={styles['dragon-list-page-container']}>
      <div className={styles['dragon-list-page-table']}>
        {isNeedDragonModal && (
          <DragonModal isOpen={isNeedDragonModal} onClose={handleModalClose} dragonData={dragonList[0]} />
        )}
        {dragonList.map((dragonData) => {
          const { flickr_images, name, description } = dragonData;
          return (
            <DragonListItem
              key={dragonData.id}
              onClick={handleDragonListItemClick}
              flickr_images={flickr_images}
              name={name}
              description={description}
            />
          );
        })}
        <NavLink route={AppRoutes.ROOT} prompt={''} linkTitle={'Return to main page'} />
        {isLoading && (
          <div ref={sentryRef}>
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export { DragonListPage };
