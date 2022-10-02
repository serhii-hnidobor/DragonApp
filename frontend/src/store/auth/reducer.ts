import { createReducer, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from 'constants/enums/enums';
import { UserBaseResponseDto } from 'constants/types/types';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { signOut, refreshTokens, signIn, signUp, loadCurrentUser } from './actions';
import { getRejectedErrorData } from '../../helpers/helpers';

type State = {
  dataStatus: DataStatus;
  error: string | undefined;
  errorCode: string | undefined;
  user: UserBaseResponseDto | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  user: null,
  error: undefined,
  errorCode: undefined,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(signIn.rejected, (state, { error, payload }) => {
    state.dataStatus = DataStatus.REJECTED;

    const { errorCode, message } = getRejectedErrorData(error, payload);
    state.error = message;
    state.errorCode = errorCode;
  });
  builder.addCase(loadCurrentUser.fulfilled, (state, { payload }) => {
    state.user = payload.user;
  });
  builder.addCase(signIn.fulfilled, (state, { payload }) => {
    state.user = payload;
  });

  builder.addMatcher(isAnyOf(signOut.rejected, signOut.fulfilled), (state) => {
    state.user = null;
  });
  builder.addMatcher(
    isAnyOf(signUp.pending, signIn.pending, refreshTokens.pending, signOut.pending, loadCurrentUser.pending),
    (state) => {
      state.dataStatus = DataStatus.PENDING;
      state.error = undefined;
      state.errorCode = undefined;
    },
  );
  builder.addMatcher(
    isAnyOf(signUp.fulfilled, signIn.fulfilled, refreshTokens.fulfilled, signOut.fulfilled, loadCurrentUser.fulfilled),
    (state) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.error = undefined;
      state.errorCode = undefined;
    },
  );
  builder.addMatcher(
    isAnyOf(signUp.rejected, refreshTokens.rejected, signOut.rejected, loadCurrentUser.rejected),
    (state, { error }) => {
      state.dataStatus = DataStatus.REJECTED;

      state.error = error.message;
    },
  );
});

const persistConfig = {
  key: 'auth',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export { persistedReducer as reducer };
