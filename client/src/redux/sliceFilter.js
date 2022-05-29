import { createSlice } from '@reduxjs/toolkit';

const initialFilter = '';

export const filterContacts = createSlice({
  name: 'filter',
  initialState: initialFilter,
  reducers: {
    newFilter(_state, action) {
      // if (!action.payload) {
      //   return;
      // }
      return action.payload;
    },
  },
});

export const { newFilter } = filterContacts.actions;
