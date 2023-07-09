import { combineReducers } from '@reduxjs/toolkit';
import authApi from './auth/auth.api';

const combinedReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
});

export default combinedReducer;
