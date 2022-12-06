import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './ui-slice';

const userInitialState = {
  isLogin: false,
  user: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    setUserLogin(state, action) {
      state.isLogin = true;
      state.user = {};
    },
  },
});

const userActions = userSlice.actions;
const userReducer = userSlice.reducer;

// Action Creator Thunk
const fakeLogin = () => {
  return async (dispatch) => {
    dispatch(uiActions.setIsLoading(true));

    const fakeWait = setTimeout(() => {
      dispatch(userActions.setUserLogin());

      dispatch(uiActions.setIsLoading(false));
    }, 1500);
  };
};

export { userActions, userReducer, fakeLogin };
