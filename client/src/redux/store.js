import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { filterContacts } from './sliceFilter';
// import { loginUserApi } from 'server/login';
import { contactApi } from 'server/contacts';
import { curentToken } from './sliceToken'; // root reduser для токена
import { curentUser } from './sliceAuth'; // будет хранить имя актуального пользователя и предоставлять доступ к функционалу

// ***********************работа с локалкой*********************************
// https://www.youtube.com/watch?v=sdlYNKjCGU0 гайд по локалке

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const tokenPersistConfig = {
  key: 'root', //это ключь под которым мы сохраняем сторе
  storage,
  whitelist: ['token'], // этот ключь вытягивает уже из slice
};
const rootReduser = combineReducers({
  [contactApi.reducerPath]: contactApi.reducer,
  // [loginUserApi.reducerPath]: loginUserApi.reducer,
  filter: filterContacts.reducer,
  token: curentToken.reducer,
  auth: curentUser.reducer,
});
const persistedReducer = persistReducer(tokenPersistConfig, rootReduser);
// *************************************************

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(contactApi.middleware),
  // .concat(loginUserApi.middleware),
});

export const persistor = persistStore(store); // это параметры для обертки приложения в индексе
