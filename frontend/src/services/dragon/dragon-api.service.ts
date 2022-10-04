import { ApiPath, HttpMethod, DragonApiPath, ContentType, DRAGON_NUM_ON_ONE_PAGE } from '../../constants/enums/enums';
import { Http } from '../http/http.service';
import { DragonListResponseDto, DragonResponseDto } from '../../constants/types/types';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class DragonApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public getDragonData(): Promise<DragonResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.DRAGON}${DragonApiPath.ROOT}`,
      options: {
        method: HttpMethod.GET,
      },
      preInterceptors: [],
      postInterceptors: [],
    });
  }
  public getDragonList(page: number): Promise<DragonListResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.DRAGON_LIST}`,
      options: {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify({
          page,
          limit: DRAGON_NUM_ON_ONE_PAGE,
        }),
      },
      preInterceptors: [],
      postInterceptors: [],
    });
  }
}

export { DragonApi };
