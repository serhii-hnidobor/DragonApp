import { Http } from './http/http.service';
import { StorageService } from './storage/local-storage.service';
import { DragonApi } from './dragon/dragon-api.service';
import { AuthApi } from './auth/auth';
import { ENV } from '../constants/enums/enums';
import { TokensStorageService } from './storage/tokens-storage.service';

const storageService = new StorageService();
const tokensStorageService = new TokensStorageService(storageService);

const http = new Http([], []);

const dragonApi = new DragonApi({
  apiPrefix: 'https://',
  http,
});

const authApi = new AuthApi({
  apiPrefix: ENV.API_PATH,
  http,
});

export { http, storageService, dragonApi, authApi, tokensStorageService };
