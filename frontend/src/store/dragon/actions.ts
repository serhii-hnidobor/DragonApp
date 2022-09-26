import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, DragonResponseDto } from '../../constants/types/types';
import { ActionType } from './common';

const getDragonData = createAsyncThunk<DragonResponseDto, void, AsyncThunkConfig>(
  ActionType.GET_DRAGON_DATA,
  async (_, { extra }) => {
    const { dragonApi } = extra;
    return dragonApi.getDragonData();
  },
);

export { getDragonData };
