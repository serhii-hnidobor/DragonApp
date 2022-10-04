import { ReactElement, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getDragonList } from '../../store/dragon/actions';
import { DragonListItem } from './common/dragon-list-item-component';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { DataStatus } from '../../constants/enums/data-status/data-status';
import styles from './style.module.scss';

const DragonListPage = (): ReactElement | null => {
  const dispatch = useAppDispatch();

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
    return null;
  }

  return (
    <div className={styles['dragon-list-page-container']}>
      <table className={styles['dragon-list-page-table']}>
        <tbody>
          {dragonList.map((dragonData) => {
            const { flickr_images, name, description } = dragonData;
            return (
              <DragonListItem key={dragonData.id} flickr_images={flickr_images} name={name} description={description} />
            );
          })}
          {(isLoading || hasNextPage) && <tr ref={sentryRef}></tr>}
        </tbody>
      </table>
    </div>
  );
};

export { DragonListPage };
