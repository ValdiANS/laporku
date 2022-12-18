import { createSlice } from '@reduxjs/toolkit';

const uiInitialState = {
  isLoading: true,
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

    hideInfoModal(state, action) {
      state.showInfoModal = false;
      state.infoModalType = '';
    },

    showAddReportModal(state, action) {
      state.infoModalType = 'addReport';
      state.showInfoModal = true;
    },

    showAddReportSuccessModal(state, action) {
      state.infoModalType = 'addReportSuccess';
      state.showInfoModal = true;
    },

    showAddReportErrorModal(state, action) {
      state.infoModalType = 'addReportError';
      state.showInfoModal = true;
    },

    showRegisterSuccessModal(state, action) {
      state.infoModalType = 'registerSuccess';
      state.showInfoModal = true;
    },

    showRegisterErrorModal(state, action) {
      state.infoModalType = 'registerError';
      state.showInfoModal = true;
    },

    showLoginSuccessModal(state, action) {
      state.infoModalType = 'loginSuccess';
      state.showInfoModal = true;
    },

    showLoginErrorModal(state, action) {
      state.infoModalType = 'loginError';
      state.showInfoModal = true;
    },

    showGetAllReportsErrorModal(state, action) {
      state.infoModalType = 'getAllReportsError';
      state.showInfoModal = true;
    },

    showGetReportErrorModal(state, action) {
      state.infoModalType = 'getReportError';
      state.showInfoModal = true;
    },

    showUserNotLoginErrorModal(state, action) {
      state.infoModalType = 'userNotLoginError';
      state.showInfoModal = true;
    },

    showUserNotLoginReportInvalidReportErrorModal(state, action) {
      state.infoModalType = 'userNotLoginReportInvalidReportError';
      state.showInfoModal = true;
    },

    showVoteErrorModal(state, action) {
      state.infoModalType = 'voteError';
      state.showInfoModal = true;
    },

    showInvalidReportErrorModal(state, action) {
      state.infoModalType = 'invalidReportError';
      state.showInfoModal = true;
    },

    showInvalidReportAcceptedModal(state, action) {
      state.infoModalType = 'invalidReportAccepted';
      state.showInfoModal = true;
    },

    showGetInvalidReportsErrorModal(state, action) {
      state.infoModalType = 'getInvalidReportsError';
      state.showInfoModal = true;
    },

    showDeleteReportSuccessModal(state, action) {
      state.infoModalType = 'deleteReportSuccess';
      state.showInfoModal = true;
    },

    showDeleteReportErrorModal(state, action) {
      state.infoModalType = 'deleteReportError';
      state.showInfoModal = true;
    },

    showGetUserLocationErrorModal(state, action) {
      state.infoModalType = 'getUserLocationError';
      state.showInfoModal = true;
    },
  },
});

const uiActions = uiSlice.actions;
const uiReducer = uiSlice.reducer;

export { uiActions, uiReducer };
