import { Http } from './http/http.service';
import { StorageService } from './storage/local-storage.service';
import { DragonApi } from './dragon/dragon-api.service';
import { AuthApi } from './auth/auth';
import { ENV } from '../constants/enums/enums';
import { TokensStorageService } from './storage/tokens-storage.service';
import { attachAuthTokenInterceptor } from './http/interceptors/attach-auth-token-interceptor';
import { refreshTokenInterceptor } from './http/interceptors/refresh-token-interceptor';

const storageService = new StorageService();
const tokensStorageService = new TokensStorageService(storageService);

const http = new Http([attachAuthTokenInterceptor], [refreshTokenInterceptor]);

const dragonApi = new DragonApi({
  apiPrefix: 'https://',
  http,
});

const authApi = new AuthApi({
  apiPrefix: ENV.API_PATH,
  http,
});

export { http, storageService, dragonApi, authApi, tokensStorageService };
