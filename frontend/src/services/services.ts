import { Http } from './http/http.service';
import { StorageService } from './storage/local-storage.service';
import { DragonApi } from './dragon/dragon-api.service';
import { AuthApi } from './auth/auth';
import { ENV } from '../constants/enums/enums';

const storageService = new StorageService();

const http = new Http([], []);

const dragonApi = new DragonApi({
  apiPrefix: 'https://',
  http,
});

const authApi = new AuthApi({
  apiPrefix: ENV.API_PATH,
  http,
});

export { http, storageService, dragonApi, authApi };
