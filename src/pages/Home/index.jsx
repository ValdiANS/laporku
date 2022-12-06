import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { XyzTransition } from '@animxyz/react';

import AddReportSidebar from './components/AddReportSidebar';
import ViewReportSidebar from './components/ViweReportSidebar';

import markerIcons from '../../components/LeafletMarkerIcon/';
import MapEvents from './components/MapEvents';
import AddReportButton from './components/AddReportButton';
import CustomMapControl from './components/CustomMapControl';

import { locationActions } from '../../store/slice/location-slice';

import Logo from '../../components/SVG/Logo';

import UserDefaultAvatar from '../../assets/image/default-avatar.png';

const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const isCurrentUrlNotHomePage = location.pathname !== '/';

  const isUserLogin = useSelector((state) => state.user.isLogin);

  const upiCibiruCoordinate = useSelector((state) => state.location.upiCibiru);
  const markersLocation = useSelector((state) => state.location.markers);
  const userLocation = useSelector((state) => state.location.user);

  const [isAddingReport, setIsAddingReport] = useState(false);
  const [isViewingReport, setIsViewingReport] = useState(false);

  // console.log(location);

  // console.log(markersLocation);

  const addReportClickHandler = () => {
    setIsAddingReport(true);
  };

  const closeAddReportSidebarHandler = () => {
    setIsAddingReport(false);
  };

  const closeViewReportSidebarHandler = () => {
    setIsViewingReport(false);
  };

  const removeUserLocationMarkerClickHandler = () => {
    dispatch(locationActions.removeUserLocation());
  };

  return (
    <main className='w-screen h-screen overflow-hidden bg-primaryGradient flex flex-row'>
      <Outlet />

      {/* Modal */}
      <XyzTransition appearVisible className='item-group' xyz='fade down-100%'>
        <div className='z-[99999]'>
          <div className='absolute top-0 left-0 w-screen h-screen grid place-items-center'>
            <div className='modal-container px-4 py-8 bg-white/60 rounded-lg border-2 border-solid border-[#626262] backdrop-blur-sm flex flex-col justify-center items-center gap-y-8'>
              <h2 className='font-bold text-3xl text-primary text-center'>
                Laporan Berhasil Ditambahkan
              </h2>

              <button className='px-14 py-3 bg-[#626262] font-bold text-xl text-[#F7F7F7] text-center rounded-lg transition-all hover:-translate-y-1 active:translate-y-0 hover:brightness-125'>
                Tutup
              </button>
            </div>
          </div>
        </div>
      </XyzTransition>

      {/* Add Report Sidebar */}
      <AddReportSidebar
        show={isAddingReport}
        onClose={closeAddReportSidebarHandler}
      />

      <div className='w-full h-screen flex sm:block flex-col'>
        <div className='relative w-screen sm:w-full h-full flex-1'>
          <MapContainer
            center={upiCibiruCoordinate}
            zoom={17}
            scrollWheelZoom={true}
            minZoom={4}
            className={`${
              isCurrentUrlNotHomePage ? 'sm:w-full' : 'sm:w-screen'
            } w-screen h-full sm:h-screen z-0 transition-all`}
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

            {/* Add Map Events */}
            {/* <MapEvents /> */}

            {markersLocation.map((markerLocation) => (
              <Marker
                key={JSON.stringify(markerLocation.coordinate)}
                position={markerLocation.coordinate}
                icon={markerIcons.fire}
              />
            ))}

            {/* Control */}
            <div className='absolute bottom-8 sm:top-8 right-8 flex flex-col-reverse sm:flex-row gap-x-6 gap-y-5'>
              {/* Add Button */}
              <AddReportButton
                show={isUserLogin && !isAddingReport}
                onClick={addReportClickHandler}
              />

              {/* Custom Map Control */}
              <CustomMapControl show={!isAddingReport} />
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
            {!isAddingReport &&
              !isViewingReport &&
              !isCurrentUrlNotHomePage && (
                <div className='absolute top-8 left-8 w-full max-w-[250px]'>
                  <Link to='/'>
                    <Logo className='w-full max-w-[150px] h-fit sm:max-w-[250px]' />
                  </Link>
                </div>
              )}
          </XyzTransition>
        </div>

        <button
          onClick={() => {}}
          className='flex-0 px-8 py-4 bg-primaryGradient'
        >
          <div className='flex flex-row items-center gap-x-4'>
            <div className='w-[60px] h-[60px] rounded-full overflow-hidden border-4 border-solid border-primary'>
              <img
                src={UserDefaultAvatar}
                alt="User's Avatar"
                className='w-full aspect-square object-cover object-center'
              />
            </div>

            <p className='font-bold text-xl text-white'>User123</p>
          </div>
        </button>
      </div>
    </main>
  );
};

export default Home;
