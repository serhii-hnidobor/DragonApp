import { ContentType, HttpMethod } from '../../enums/enums';

type HttpOptions = {
  method: HttpMethod;
  contentType: ContentType;
  payload: BodyInit | null;
};

export { type HttpOptions };
