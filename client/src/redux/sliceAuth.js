import { createSlice } from '@reduxjs/toolkit';

const initialUser = ''; //тут будем хранить актуальное имя пользователя

export const curentUser = createSlice({
  name: 'auth',
  initialState: initialUser,
  reducers: {
    isAuth(_state, action) {
      //   if (!action.payload) {
      //     return;
      //   }
      return action.payload;
    },
  },
});

export const { isAuth } = curentUser.actions;
