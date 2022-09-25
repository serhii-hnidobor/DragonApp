import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from '../../constants/enums/enums';

import { getDragonData } from './actions';
import { DragonResponseDto } from '../../constants/types/dragon/dragon-response-dto';

type State = {
  data: {
    currentPage: number;
    lastPage: number;
    dataStatus: DataStatus;
    list: DragonResponseDto[];
    error: string | undefined;
  };
};

const initialState: State = {
  data: {
    lastPage: -1,
    currentPage: -1,
    dataStatus: DataStatus.IDLE,
    list: [],
    error: undefined,
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getDragonData.pending, (state) => {
    state.data.dataStatus = DataStatus.PENDING;
    state.data.error = undefined;
  });

  builder.addCase(getDragonData.fulfilled, (state, { payload }) => {
    state.data.list.push(payload);
  });
});

export { reducer };
