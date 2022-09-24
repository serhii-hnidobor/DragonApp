import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from '../../constants/enums/enums';

import { getDragonData } from './actions';

type State = {
  data: {
    currentPage: number;
    lastPage: number;
    dataStatus: DataStatus;
    error: string | undefined;
  };
};

const initialState: State = {
  data: {
    lastPage: -1,
    currentPage: -1,
    dataStatus: DataStatus.IDLE,
    error: undefined,
  },
};

const reducer = createReducer(initialState, (builder) => {
      builder.addCase(getDragonData.pending, (state) => {
        state.data.dataStatus = DataStatus.PENDING;
        state.data.error = undefined;
      });

      builder.addCase(getDragonData.fulfilled, (state, {payload}) => {
        console.log(payload);
      });
    }
);

export { reducer };
