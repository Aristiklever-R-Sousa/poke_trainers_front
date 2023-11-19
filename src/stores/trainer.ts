import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { RootState } from './index';

interface TrainerState {
  id: number | null;
  nickname: string | null;
  token: string | null;
}

const initialState = {
  id: null,
  nickname: null,
  token: null,
} as TrainerState;

export const trainerSlice = createSlice({
  name: 'trainer',
  initialState,
  reducers: {
    setTrainer: (state, action: PayloadAction<TrainerState>) => {
      state.id = action.payload.id;
      state.nickname = action.payload.nickname;
      state.token = action.payload.token;
    },
  },
});

export const { setTrainer } = trainerSlice.actions;

export const selectTrainer = (state: RootState) => state.trainer;

export default trainerSlice.reducer;
