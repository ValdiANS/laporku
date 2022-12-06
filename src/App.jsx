import { Fragment } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';

import router from './routes/router';

import LoadingScreen from './components/LoadingScreen';
import Modal from './components/Modal';

const App = () => {
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
