import { combineReducers } from '@reduxjs/toolkit';
import { reducer as dragon } from './dragon/reducer';
import { reducer as auth } from './auth/reducer';

const rootReducer = combineReducers({
  dragon,
  auth,
});

export { rootReducer };
