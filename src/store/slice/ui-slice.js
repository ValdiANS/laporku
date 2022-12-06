import { createSlice } from '@reduxjs/toolkit';

const uiInitialState = {
  isLoading: false,
  showInfoModal: false,
  infoModalType: '',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: uiInitialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },

    showInfoModal(state, action) {
      /*
        action: {
          payload: {
            type: ''
          }
        }
      */

      state.infoModalType = action.payload.type;
      state.showInfoModal = true;
    },

    showInfoModal(state, action) {
      state.showInfoModal = false;
      state.infoModalType = '';
    },
  },
});

const uiActions = uiSlice.actions;
const uiReducer = uiSlice.reducer;

export { uiActions, uiReducer };
