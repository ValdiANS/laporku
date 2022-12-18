import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useMap, useMapEvents } from 'react-leaflet';

import { XyzTransition } from '@animxyz/react';

import { locationActions } from '../../../store/slice/location-slice';
import { uiActions } from '../../../store/slice/ui-slice';

import LoginButton from './LoginButton';

import PlusSmallIcon from '../../../components/SVG/PlusSmallIcon';
import MinusSmallIcon from '../../../components/SVG/MinusSmallIcon';
import MyLocationIcon from '../../../components/SVG/MyLocationIcon';

import UserDefaultAvatar from '../../../assets/image/default-avatar.png';

const CustomMapControl = ({
  show = true,
  isAdmin = false,
  isAddingReport = false,
}) => {
  const dispatch = useDispatch();

  const isUserLogin = useSelector((state) => state.user.isLogin);

  let map = useMapEvents({
    locationfound: (e) => {
      if (isAddingReport) {
        return;
      }

      console.log('my location found');

      dispatch(
        locationActions.setUserLocation({
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        })
      );
    },

    locationerror: (e) => {
      if (isAddingReport) {
        return;
      }

      console.log('location error');

      dispatch(uiActions.showGetUserLocationErrorModal());
    },
  });

  // if (isAddingReport) {
  //   console.log('wow');
  //   map = '';
  // }

  const zoomInClickHandler = () => {
    map.zoomIn();
  };

  const zoomOutClickHandler = () => {
    map.zoomOut();
  };

  const myLocationClickHandler = () => {
    map.locate({
      setView: true,
    });

    console.log('getting my location');
  };

  return (
    <XyzTransition appearVisible className='item-group' xyz='fade right-100%'>
      {show && (
        <div className='flex flex-col-reverse sm:flex-col items-end sm:items-center gap-y-5 z-[99999]'>
          <XyzTransition
            appearVisible
            className='item-group'
            xyz='fade right-100%'
          >
            {isUserLogin && (
              <Link
                to={'/profile'}
                className='hidden sm:block w-[80px] h-[80px] rounded-full overflow-hidden border-4 border-solid border-primary'
              >
                <img
                  src={UserDefaultAvatar}
                  alt="User's Avatar"
                  className='w-full aspect-square object-cover object-center'
                />
              </Link>
            )}
          </XyzTransition>

          {!isUserLogin && !isAdmin && <LoginButton />}

          <div className='w-[50px] rounded-xl bg-primaryGradient border-2 border-solid border-secondary overflow-hidden'>
            <button
              onClick={zoomInClickHandler}
              className='w-full aspect-square bg-primaryGradient p-3 grid place-items-center border-b-2 border-solid border-b-secondary rounded-t-xl transition-all hover:brightness-105 active:brightness-100'
            >
              <PlusSmallIcon className='w-full' />
            </button>

            <button
              onClick={zoomOutClickHandler}
              className='w-full aspect-square bg-primaryGradient p-3 grid place-items-center rounded-b-xl transition-all hover:brightness-105 active:brightness-100'
            >
              <MinusSmallIcon className='w-full' />
            </button>
          </div>

          <button
            onClick={myLocationClickHandler}
            className='w-[50px] aspect-square rounded-xl bg-primaryGradient border-2 border-solid border-secondary hover:brightness-105 active:brightness-100'
          >
            <MyLocationIcon className='w-full' />
          </button>
        </div>
      )}
    </XyzTransition>
  );
};

export default CustomMapControl;
