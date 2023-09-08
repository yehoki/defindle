import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  isOpen: boolean;
  animate: boolean;
};

const initialState = {
  isOpen: false,
  animate: false,
} as InitialState;

const infoModalSlice = createSlice({
  name: 'infoModal',
  initialState: initialState,
  reducers: {
    onOpen: (state) => {
      return { isOpen: true, animate: state.animate };
    },
    onOpenAnimate: (state) => {
      return {
        isOpen: state.isOpen,
        animate: true,
      };
    },
    onCloseAnimate: (state) => {
      return { isOpen: state.isOpen, animate: false };
    },
    onClose: (state) => {
      return { isOpen: false, animate: state.animate };
    },
  },
});

export const { onOpen, onClose, onCloseAnimate, onOpenAnimate } =
  infoModalSlice.actions;
export default infoModalSlice.reducer;
