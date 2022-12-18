import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './ui-slice';

const USER_ID_KEY = 'USER_ID';
const ADMIN_ID_KEY = 'ADMIN_ID';
const EXPIRE_KEY = 'EXPIRE';

const saveUserInfoToLocalStorage = (
  userId = '',
  expirationTime = 0,
  isAdmin = false
) => {
  if (isAdmin) {
    localStorage.setItem(ADMIN_ID_KEY, userId);
  } else {
    localStorage.setItem(USER_ID_KEY, userId);
  }

  localStorage.setItem(EXPIRE_KEY, expirationTime.toString());
};

const getUserInfoFromLocalStorage = () => {
  const userId = localStorage.getItem(USER_ID_KEY);
  const adminId = localStorage.getItem(ADMIN_ID_KEY);
  const expirationTime = parseInt(localStorage.getItem(EXPIRE_KEY));

  if (userId !== null) {
    return {
      userId,
      expirationTime,
    };
  }

  if (adminId !== null) {
    return {
      adminId,
      expirationTime,
    };
  }

  return {
    userId,
    adminId,
    expirationTime,
  };
};

const deleteUserInfoFromLocalStorage = () => {
  localStorage.removeItem(USER_ID_KEY);
  localStorage.removeItem(ADMIN_ID_KEY);
  localStorage.removeItem(EXPIRE_KEY);
};

const userInitialState = {
  isLogin: false,
  user: {
    ratedReport: [],
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    login(state, action) {
      state.isLogin = true;
      state.user = action.payload || {};

      // expiration time
      // 24 hour from now
      const expirationTimeInSeconds =
        new Date().getTime() / 1000 + 60 * 60 * 24;

      if (action.payload.isAdmin) {
        saveUserInfoToLocalStorage(
          action.payload.id,
          expirationTimeInSeconds,
          true
        );
      } else {
        saveUserInfoToLocalStorage(action.payload.id, expirationTimeInSeconds);
      }
    },

    logout(state, action) {
      state.isLogin = false;
      state.user = {};

      deleteUserInfoFromLocalStorage();
    },

    addRatedReport(
      state,
      action = {
        payload: {
          reportId: '',
          vote,
        },
      }
    ) {
      state.user.ratedReport.push({
        reportId: action.payload.reportId,
        vote: action.payload.vote,
      });
    },

    deleteRatedReport(
      state,
      action = {
        payload: {
          reportId: '',
        },
      }
    ) {
      state.user.ratedReport = state.user.ratedReport.filter(
        (report) => report.reportId !== action.payload.reportId
      );
    },
  },
});

const userActions = userSlice.actions;
const userReducer = userSlice.reducer;

/*
  localstorage key:
    - userId: 'USER_ID'
    - expire: 'EXPIRE'

  localstorage value:
    - userId: string
    - expire: int (detik) -> (new Date().getTime() / 1000)
*/

export { userActions, userReducer, getUserInfoFromLocalStorage };
