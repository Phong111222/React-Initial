import { configureStore } from '@reduxjs/toolkit';
import authApi from './auth/auth.api';
import combinedReducer from './appReducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const rtkQueryMiddleware = [authApi.middleware];

const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(
      rtkQueryMiddleware
    );
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const rtkApi = { authApi };
