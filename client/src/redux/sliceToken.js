import { createSlice } from '@reduxjs/toolkit';

const initialToken = '';

export const curentToken = createSlice({
  name: 'token',
  initialState: initialToken,
  reducers: {
    newToken(_state, action) {
      // if (!action.payload) {
      //   return;
      // }
      return action.payload;
    },
  },
});

export const { newToken } = curentToken.actions;
