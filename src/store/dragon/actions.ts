import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from '../../constants/types/types';
import { ActionType } from './common';
import { DragonResponseDto } from '../../constants/types/types';

const getDragonData = createAsyncThunk<DragonResponseDto, number, AsyncThunkConfig>(
  ActionType.GET_DRAGON_DATA,
  async (page, { extra }) => {
    const { dragonApi } = extra;

    return dragonApi.getDragonData(page);
  },
);

export { getDragonData };
