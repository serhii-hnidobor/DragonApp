import { combineReducers } from '@reduxjs/toolkit';
import { reducer as dragon } from './dragon/reducer';

const rootReducer = combineReducers({
  dragon,
});

export { rootReducer };
