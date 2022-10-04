import { FC, ReactElement } from 'react';
import { CachedImg } from '../../../components/common/cached-img/cached-img';

type Props = {
  flickr_images: string[];
  name: string;
  description: string;
};

const DragonListItem: FC<Props> = ({ flickr_images, name, description }): ReactElement => {
  return (
    <tr>
      <td>
        <CachedImg src={flickr_images[0]} alt={name} height={'200px'} />
      </td>
      <td>{name}</td>
      <td>{description}</td>
    </tr>
  );
};

export { DragonListItem };
