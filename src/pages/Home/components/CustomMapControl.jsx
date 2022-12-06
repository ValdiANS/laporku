import { useDispatch, useSelector } from 'react-redux';
import { useMapEvents } from 'react-leaflet';

import { XyzTransition } from '@animxyz/react';

import { locationActions } from '../../../store/slice/location-slice';

import LoginButton from './LoginButton';

import PlusSmallIcon from '../../../components/SVG/PlusSmallIcon';
import MinusSmallIcon from '../../../components/SVG/MinusSmallIcon';
import MyLocationIcon from '../../../components/SVG/MyLocationIcon';

import UserDefaultAvatar from '../../../assets/image/default-avatar.png';

const CustomMapControl = ({ show = true, isAdmin = false }) => {
  const dispatch = useDispatch();

  const isUserLogin = useSelector((state) => state.user.isLogin);

  const map = useMapEvents({
    locationfound: (e) => {
      console.log('my location found');
      console.log(e);

      dispatch(
        locationActions.setUserLocation({
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        })
      );
    },

    locationerror: (e) => {
      console.log('location error');
    },
  });

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

  const profileImageClickHandler = () => {
    console.log('Profile image clicked');
    alert('Profile image clicked');
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
              <button
                onClick={profileImageClickHandler}
                className='hidden sm:block w-[80px] h-[80px] rounded-full overflow-hidden border-4 border-solid border-primary'
              >
                <img
                  src={UserDefaultAvatar}
                  alt="User's Avatar"
                  className='w-full aspect-square object-cover object-center'
                />
              </button>
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
