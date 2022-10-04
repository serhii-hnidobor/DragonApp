import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, DragonListResponseDto, DragonResponseDto } from '../../constants/types/types';
import { ActionType } from './common';

const getDragonData = createAsyncThunk<DragonResponseDto, void, AsyncThunkConfig>(
  ActionType.GET_DRAGON_DATA,
  async (_, { extra }) => {
    const { dragonApi } = extra;
    return dragonApi.getDragonData();
  },
);

const getDragonList = createAsyncThunk<DragonListResponseDto, number, AsyncThunkConfig>(
  ActionType.GET_DRAGON_LIST,
  async (page, { extra }) => {
    const { dragonApi } = extra;
    return dragonApi.getDragonList(page);
  },
);

export { getDragonData, getDragonList };
