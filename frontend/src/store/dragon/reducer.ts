import { createReducer } from '@reduxjs/toolkit';
import { DataStatus, StorageKeys } from '../../constants/enums/enums';
import { getDragonData, getDragonList } from './actions';
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
    storageService.save(StorageKeys.CACHED_DRAGON_DATA, payload);
  });

  builder.addCase(getDragonList.pending, (state) => {
    state.data.dataStatus = DataStatus.PENDING;
    state.data.error = undefined;
  });

  builder.addCase(getDragonList.fulfilled, (state, { payload }) => {
    state.data.list.concat(payload.docs);
    state.data.dataStatus = DataStatus.FULFILLED;
    state.data.lastPage = payload.totalPages;
    state.data.currentPage = payload.page;
  });
});

export { reducer };
