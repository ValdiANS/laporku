import { Fragment } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { XyzTransition } from '@animxyz/react';

import { userActions } from '../../store/slice/user-slice';

import Logo from '../../components/SVG/Logo';
import CloseCrossIcon from '../../components/SVG/CloseCrossIcon';

import UserDefaultAvatar from '../../assets/image/default-avatar.png';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isUserLogin = useSelector((state) => state.user.isLogin);
  const userData = useSelector((state) => state.user.user);

  const logoutHandler = () => {
    dispatch(userActions.logout());

    navigate('/', { replace: true });
  };

  return (
    <Fragment>
      {!isUserLogin && <Navigate to='/' replace={true} />}

      <XyzTransition appearVisible className='item-group' xyz='fade left-100%'>
        <div className='absolute top-0 left-0 sm:static w-screen h-screen sm:w-[600px] sm:h-auto z-[99999] sm:z-auto'>
          <div className='w-screen sm:w-[600px] h-full p-8 bg-primaryGradient flex flex-col gap-y-8 relative overflow-y-auto'>
            {/* Sidebar Loading Screen */}
            {/* <SidebarLoadingScreen /> */}

            <div className='flex flex-row justify-between items-center gap-x-8'>
              <Link to='/'>
                <Logo className='w-full max-w-[150px] sm:max-w-[250px] h-fit' />
              </Link>

              {/* Close Button */}
              <Link
                to='/'
                className='bg-[#FF5454] p-3 rounded-lg transition-all hover:-translate-y-1 active:translate-y-0'
              >
                <CloseCrossIcon className='w-full aspect-square' />
              </Link>
            </div>

            <section className='w-full mt-14 flex flex-col items-center gap-y-2'>
              <div>
                <img
                  src={UserDefaultAvatar}
                  alt="User's Avatar"
                  className='w-[100px] h-[100px] aspect-square object-cover object-center rounded-full overflow-hidden border-2 border-solid border-gray-300'
                />
              </div>

              <div className='text-white text-center'>
                <h1 className='font-bold text-4xl'>{userData.name}</h1>

                <p className='text-xl font-light'>
                  <span>{userData.email}</span> <br />
                  <span>{userData.phoneNumber}</span>
                </p>
              </div>

              <div className='mt-16'>
                <button
                  onClick={logoutHandler}
                  className='px-12 py-3 font-bold text-white rounded-lg bg-[#FF6060] transition-all hover:-translate-y-1 active:translate-y-0 hover:brightness-105 active:brightness-100'
                >
                  Keluar
                </button>
              </div>
            </section>
          </div>
        </div>
      </XyzTransition>
    </Fragment>
  );
};

export default Profile;
