import { Fragment, useEffect, useCallback } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import router from './routes/router';
import { API } from './lib/api';

import LoadingScreen from './components/LoadingScreen';
import Modal from './components/Modal';

import { reportsActions } from './store/slice/reports-slice';
import { uiActions } from './store/slice/ui-slice';
import {
  getUserInfoFromLocalStorage,
  userActions,
} from './store/slice/user-slice';

const App = () => {
  const dispatch = useDispatch();

  const checkIsLogin = useCallback(async () => {
    const localUserInfo = getUserInfoFromLocalStorage();

    if (!localUserInfo.userId && !localUserInfo.adminId) {
      return;
    }

    // check if expiration time is expired
    const currentTimeInSeconds = new Date().getTime() / 1000;

    if (localUserInfo.expirationTime - currentTimeInSeconds <= 0) {
      dispatch(userActions.logout());
      return;
    }

    try {
      let userData;

      if (localUserInfo.userId) {
        userData = await API.GetUser(localUserInfo.userId);
      }

      if (localUserInfo.adminId) {
        userData = await API.GetAdmin(localUserInfo.adminId);
      }

      dispatch(userActions.login(userData.json.data));
    } catch (error) {
      console.log(error.message);

      dispatch(userActions.logout());
    }
  }, []);

  const getAllReports = useCallback(async () => {
    try {
      const getAllReportsResponse = await API.GetAllReports();

      if (!getAllReportsResponse.response.ok) {
        throw new Error(getAllReportsResponse.json.message);
      }

      dispatch(
        reportsActions.setReports(getAllReportsResponse.json.data.reports)
      );
    } catch (error) {
      console.log('Gagal mendapatkan semua laporan!');
      console.log(error.message);
      console.log(error);

      dispatch(uiActions.showGetAllReportsErrorModal());
    }
  }, []);

  const init = useCallback(async () => {
    dispatch(uiActions.setIsLoading(true));

    await checkIsLogin();
    await getAllReports();

    dispatch(uiActions.setIsLoading(false));
  }, []);

  useEffect(() => {
    init();
  }, []);

  // UI
  const isLoading = useSelector((state) => state.ui.isLoading);
  const isShowInfoModal = useSelector((state) => state.ui.showInfoModal);
  const infoModalType = useSelector((state) => state.ui.infoModalType);

  return (
    <Fragment>
      <RouterProvider router={router} />

      <LoadingScreen show={isLoading} />

      <Modal show={isShowInfoModal} type={infoModalType} />
    </Fragment>
  );
};

export default App;
