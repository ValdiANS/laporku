import { Fragment } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { XyzTransition } from '@animxyz/react';

import Logo from '../../../components/SVG/Logo';

const AdminLogin = () => {
  const dispatch = useDispatch();

  const isUserLogin = useSelector((state) => state.user.isLogin);

  const loginSubmitHandler = (e = new SubmitEvent()) => {
    e.preventDefault();
  };

  return (
    <Fragment>
      {isUserLogin && <Navigate to='/' replace={true} />}

      <XyzTransition appearVisible className='item-group' xyz='fade down-100%'>
        <div className='w-full h-full min-h-screen bg-primaryGradient overflow-y-auto flex flex-row justify-center'>
          <div className='w-full h-full p-8 flex flex-col gap-y-8'>
            <Link to='/'>
              <Logo className='w-full max-w-[150px] sm:max-w-[250px] h-fit' />
            </Link>

            <form
              onSubmit={loginSubmitHandler}
              className='w-full max-w-[650px] mx-auto flex flex-col gap-y-6'
            >
              <h1 className='font-bold text-3xl text-white text-center'>
                Selamat Datang Admin!
              </h1>

              <div className='input-container w-full flex flex-col gap-y-4'>
                <div className='input space-y-2'>
                  <label
                    htmlFor='email'
                    className='font-semibold text-2xl text-white'
                  >
                    Email
                  </label>

                  <input
                    type='email'
                    name='email'
                    id='email'
                    placeholder='Isi email kamu di sini...'
                    className='w-full p-5 rounded-lg'
                    autoFocus
                  />
                </div>

                <div className='input space-y-2'>
                  <label
                    htmlFor='password'
                    className='font-semibold text-2xl text-white'
                  >
                    Password
                  </label>

                  <input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='Isi password kamu di sini...'
                    className='w-full p-5 rounded-lg'
                  />
                </div>
              </div>

              <div className='w-full flex flex-row justify-end gap-x-4'>
                <button
                  type='submit'
                  className='px-8 py-4 bg-white font-bold text-xl text-primary text-center rounded-lg'
                >
                  Masuk
                </button>
              </div>
            </form>
          </div>
        </div>
      </XyzTransition>
    </Fragment>
  );
};

export default AdminLogin;
