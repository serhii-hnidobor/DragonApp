import { ApiPath, HttpMethod, DragonApiPath } from '../../constants/enums/enums';
import { Http } from '../http/http.service';
import { DragonResponseDto } from '../../constants/types/types';

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
    });
  }
}

export { DragonApi };
