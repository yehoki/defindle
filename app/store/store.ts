import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import infoModalReducer from '@/app/reducers/InfoModalReducer';
export const store = configureStore({
  reducer: {
    infoModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useInfoModalSelector: TypedUseSelectorHook<RootState> =
  useSelector;
