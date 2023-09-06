import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  isOpen: boolean;
};

const initialState = {
  isOpen: false,
} as InitialState;

const infoModalSlice = createSlice({
  name: 'infoModal',
  initialState: initialState,
  reducers: {
    onOpen: () => {
      return { isOpen: true };
    },
    onClose: () => {
      return { isOpen: false };
    },
  },
});

export const { onOpen, onClose } = infoModalSlice.actions;
export default infoModalSlice.reducer;
