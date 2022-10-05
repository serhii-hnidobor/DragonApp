import { configureStore } from '@reduxjs/toolkit';
import { dragonApi, tokensStorageService, authApi } from '../services/services';
import { rootReducer } from './root-reducer';
import { injectStore as injectStoreRefreshInterceptor } from '../services/http/interceptors/refresh-token-interceptor';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const extraArgument = {
  dragonApi,
  tokensStorageService,
  authApi,
};

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: { extraArgument },
      serializableCheck: false,
    });
  },
});

injectStoreRefreshInterceptor(store);

const persistor = persistStore(store);

type storeType = typeof store;

export { extraArgument, store, persistor, type storeType };
