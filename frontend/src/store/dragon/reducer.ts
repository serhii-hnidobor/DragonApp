import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from '../../constants/enums/enums';
import { getDragonData } from './actions';
import { DragonResponseDto } from '../../constants/types/dragon/dragon-response-dto';
import { storageService } from '../../services/services';

type State = {
  data: {
    mainDragon: {
      data: DragonResponseDto | undefined;
      dataStatus: DataStatus;
    };
    currentPage: number;
    lastPage: number;
    dataStatus: DataStatus;
    list: DragonResponseDto[];
    error: string | undefined;
  };
};

const initialState: State = {
  data: {
    mainDragon: {
      data: undefined,
      dataStatus: DataStatus.IDLE,
    },
    lastPage: -1,
    currentPage: -1,
    dataStatus: DataStatus.IDLE,
    list: [],
    error: undefined,
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getDragonData.pending, (state) => {
    state.data.mainDragon.dataStatus = DataStatus.PENDING;
    state.data.error = undefined;
  });

  builder.addCase(getDragonData.fulfilled, (state, { payload }) => {
    state.data.mainDragon.data = payload;
    state.data.mainDragon.dataStatus = DataStatus.FULFILLED;
    storageService.save('dragon_data', payload);
  });
});

export { reducer };
