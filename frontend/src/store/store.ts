import { configureStore } from '@reduxjs/toolkit';

import { dragonApi, tokensStorageService, authApi } from '../services/services';
import { rootReducer } from './root-reducer';

const extraArgument = {
  dragonApi,
  tokensStorageService,
  authApi,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: { extraArgument },
      serializableCheck: false,
    });
  },
});

type storeType = typeof store;

export { extraArgument, store, type storeType };
