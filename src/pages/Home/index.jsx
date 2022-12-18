import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { XyzTransition } from '@animxyz/react';

import AddReportSidebar from './components/AddReportSidebar';

import markerIcons from '../../components/LeafletMarkerIcon/';
import AddReportMapEvents from './components/AddReportMapEvents';

import AddReportButton from './components/AddReportButton';
import CustomMapControl from './components/CustomMapControl';
import MarkerWithPopup from './components/MarkerWithPopup';
import Modal from '../../components/Modal';

import { locationActions } from '../../store/slice/location-slice';
import { uiActions } from '../../store/slice/ui-slice';

import Logo from '../../components/SVG/Logo';

import UserDefaultAvatar from '../../assets/image/default-avatar.png';

const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const isCurrentUrlNotHomePage = location.pathname !== '/';

  // User data
  const isUserLogin = useSelector((state) => state.user.isLogin);
  const userData = useSelector((state) => state.user.user);
  const reports = useSelector((state) => state.reports.reports);

  const centerOfTheMap = useSelector((state) => state.location.centerOfTheMap);
  const userLocation = useSelector((state) => state.location.user);

  const [isAddingReport, setIsAddingReport] = useState(false);
  const [showAddReportModal, setShowAddReportModal] = useState(false);

  const selectedLocation = useSelector(
    (state) => state.location.selectedLocation
  );

  const addReportClickHandler = () => {
    setIsAddingReport(true);

    // dispatch(uiActions.showAddReportModal());
    setShowAddReportModal(true);
  };

  const closeAddReportSidebarHandler = () => {
    setIsAddingReport(false);
  };

  const removeUserLocationMarkerClickHandler = () => {
    dispatch(locationActions.removeUserLocation());
  };

  const selectLocationMapEventsHandler = (lat = 0, lng = 0) => {
    dispatch(locationActions.setSelectedLocation([lat, lng]));
    setShowAddReportModal(false);
  };

  return (
    <main className='w-screen h-screen overflow-hidden bg-primaryGradient flex flex-row'>
      <Outlet />

      {/* Add Report Sidebar */}
      <AddReportSidebar
        show={isAddingReport && selectedLocation.length !== 0}
        onClose={closeAddReportSidebarHandler}
      />

      <div className='w-full h-screen flex sm:block flex-col'>
        <div className='w-screen sm:w-full h-full sm:h-screen flex-1'>
          <MapContainer
            center={centerOfTheMap}
            zoom={13}
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

            {/* Add Report Map Events */}
            {isAddingReport && selectedLocation.length === 0 && (
              <AddReportMapEvents
                onSelectLocation={selectLocationMapEventsHandler}
              />
            )}

            {isAddingReport && selectedLocation.length !== 0 && (
              <Marker position={selectedLocation}></Marker>
            )}

            {/* Render Reports Marker */}
            {reports.map((report) => (
              <MarkerWithPopup
                key={JSON.stringify(report.coordinate)}
                reportKey={report.id}
                position={report.coordinate}
                title={report.title}
                icon={markerIcons[report.type]}
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
              <CustomMapControl
                show={!isAddingReport}
                isAddingReport={isAddingReport}
              />
            </div>

            {/* Modal When Adding Report */}
            <Modal
              show={showAddReportModal}
              type={'addReport'}
              isAddingReport={isAddingReport}
              onSelectLocation={selectLocationMapEventsHandler}
            />

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
            {!isAddingReport && !isCurrentUrlNotHomePage && (
              <div className='absolute top-8 left-8 w-full max-w-[250px]'>
                <Link to='/'>
                  <Logo className='w-full max-w-[150px] h-fit sm:max-w-[250px]' />
                </Link>
              </div>
            )}
          </XyzTransition>
        </div>

        <Link
          to={'/profile'}
          className='flex-none px-8 py-4 bg-primaryGradient'
        >
          <div className='flex flex-row items-center gap-x-4'>
            <div className='w-[60px] h-[60px] rounded-full overflow-hidden border-4 border-solid border-primary'>
              <img
                src={UserDefaultAvatar}
                alt="User's Avatar"
                className='w-full aspect-square object-cover object-center'
              />
            </div>

            <p className='font-bold text-xl text-white'>
              {userData?.name || 'Guest'}
            </p>
          </div>
        </Link>
      </div>
    </main>
  );
};

export default Home;
