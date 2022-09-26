import { ReactElement, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getDragonData } from '../store/dragon/actions';

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
      <img src={flickr_images[0]} />
      <p>{name}</p>
      <a href={wikipedia}>Wiki</a>
    </div>
  );
};

export { DragonPage };
