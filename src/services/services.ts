import { Http } from './http/http.service';
import { StorageService } from './storage/local-storage.service';
import { DragonApi } from './dragon/dragon-api.service';

const storageService = new StorageService();

const http = new Http([], []);

const dragonApi = new DragonApi({
  apiPrefix: 'https://',
  http,
});

export { http, storageService, dragonApi };
