import { ApiRequest } from '../../request';
import { CONFIG } from '../../../../config/config';

const swaggerUrl: string = CONFIG.SWAGGER_URL;

export class Swagger {
  async swaggerReq() {
    return await new ApiRequest().prefixUrl(swaggerUrl).method('POST').url(swaggerUrl).send();
  }
}
