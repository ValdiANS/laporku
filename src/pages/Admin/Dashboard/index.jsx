import { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import { XyzTransition } from '@animxyz/react';

import AdminDashboardSidebar from './components/AdminDashboardSidebar';
import markerIcons from '../../../components/LeafletMarkerIcon';
import CustomMapControl from '../../Home/components/CustomMapControl';

import { locationActions } from '../../../store/slice/location-slice';

import Logo from '../../../components/SVG/Logo';

import UserDefaultAvatar from '../../../assets/image/default-avatar.png';

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const [isViewingInvalidReport, setIsViewingInvalidReport] = useState(false);

  const isUserLogin = useSelector((state) => state.user.isLogin);
  const userData = useSelector((state) => state.user.user);

  const upiCibiruCoordinate = useSelector((state) => state.location.upiCibiru);
  const markersLocation = useSelector((state) => state.location.markers);
  const userLocation = useSelector((state) => state.location.user);

  const removeUserLocationMarkerClickHandler = () => {
    dispatch(locationActions.removeUserLocation());
  };

  const mobileOpenClickHandler = () => {
    setIsViewingInvalidReport(true);
  };

  const mobileCloseClickHandler = () => {
    setIsViewingInvalidReport(false);
  };

  return (
    <Fragment>
      {/* {!userData.isAdmin && <Navigate to='/admin/login' replace={true} />} */}

      <main className='w-screen h-screen overflow-hidden bg-primaryGradient flex flex-row'>
        {/* Admin Dashboard */}
        <AdminDashboardSidebar
          show={isViewingInvalidReport}
          onClose={mobileCloseClickHandler}
        />

        <div className='w-full h-screen flex sm:block flex-col'>
          <div className='relative w-screen sm:w-full h-full flex-1'>
            <MapContainer
              center={upiCibiruCoordinate}
              zoom={17}
              scrollWheelZoom={true}
              minZoom={4}
              className='w-screen h-full sm:h-screen z-0 transition-all'
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                tileSize={512}
                zoomOffset={-1}
              />

              <Marker position={upiCibiruCoordinate} icon={markerIcons.fire}>
                <Popup>UPI Cibiru 🔥🔥🔥</Popup>
              </Marker>

              {markersLocation.map((markerLocation) => (
                <Marker
                  key={JSON.stringify(markerLocation.coordinate)}
                  position={markerLocation.coordinate}
                  icon={markerIcons.fire}
                />
              ))}

              {/* Control */}
              <div className='absolute bottom-8 sm:top-8 right-8 flex flex-col sm:flex-row gap-x-6 gap-y-5'>
                {/* Custom Map Control */}
                <CustomMapControl show={true} isAdmin={true} />

                <XyzTransition
                  appearVisible
                  className='item-group'
                  xyz='fade right-100%'
                >
                  <button
                    onClick={mobileOpenClickHandler}
                    className='block sm:hidden w-full h-fit py-2 px-4 bg-primaryGradient rounded-xl z-[99999] transition-all hover:-translate-y-1 active:translate-y-0 hover:brightness-105'
                  >
                    <span className='font-bold text-xl text-white text-center'>
                      Lihat <br /> Laporan
                    </span>
                  </button>
                </XyzTransition>
              </div>

              {/* Marker on user location */}
              {userLocation.length !== 0 && (
                <Marker position={userLocation}>
                  <Popup>
                    <div className='flex flex-col gap-4'>
                      <b>Your current location</b>

                      <button
                        onClick={removeUserLocationMarkerClickHandler}
                        className='px-4 py-2 rounded-lg bg-red-400 text-white font-medium'
                      >
                        Remove Marker
                      </button>
                    </div>
                  </Popup>
                </Marker>
              )}
            </MapContainer>

            {/* Logo */}
            <XyzTransition
              appearVisible
              className='item-group'
              xyz='fade left-100%'
            >
              <div className='absolute top-8 left-8 w-full max-w-[250px]'>
                <Link to='/'>
                  <Logo className='w-full max-w-[150px] h-fit sm:max-w-[250px]' />
                </Link>
              </div>
            </XyzTransition>
          </div>

          <div className='flex-0 px-8 py-4 bg-primaryGradient'>
            <div className='flex flex-row items-center gap-x-4'>
              <div className='w-[60px] h-[60px] rounded-full overflow-hidden border-4 border-solid border-primary'>
                <img
                  src={UserDefaultAvatar}
                  alt="User's Avatar"
                  className='w-full aspect-square object-cover object-center'
                />
              </div>

              <p className='font-bold text-xl text-white'>admin123</p>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default AdminDashboard;
