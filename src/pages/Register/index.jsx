import { Fragment } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { XyzTransition } from '@animxyz/react';

import { uiActions } from '../../store/slice/ui-slice';

import Logo from '../../components/SVG/Logo';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isUserLogin = useSelector((state) => state.user.isLogin);

  const loginSubmitHandler = (e = new SubmitEvent()) => {
    e.preventDefault();

    dispatch(uiActions.setIsLoading(true));

    const timeout = setTimeout(() => {
      navigate('/', { replace: true });

      dispatch(uiActions.setIsLoading(false));
    }, 1500);
  };

  return (
    <Fragment>
      {isUserLogin && <Navigate to='/' />}

      <XyzTransition appearVisible className='item-group' xyz='fade left-100%'>
        <div className='absolute top-0 left-0 sm:static w-screen h-screen sm:w-auto sm:h-auto z-[99999] sm:z-auto'>
          <div className='w-full sm:w-[600px] h-screen p-8 bg-primaryGradient flex flex-col gap-y-8 overflow-y-auto'>
            <Link to='/'>
              <Logo className='w-full max-w-[150px] sm:max-w-[250px] h-fit' />
            </Link>

            <form
              onSubmit={loginSubmitHandler}
              className='w-full flex flex-col gap-y-6'
            >
              <h1 className='font-bold text-3xl text-white text-center'>
                Selamat Datang! Kenalan yuk
              </h1>

              <div className='input-container w-full flex flex-col gap-y-4'>
                <div className='input space-y-2'>
                  <label
                    htmlFor='name'
                    className='font-semibold text-xl text-white'
                  >
                    Nama
                  </label>

                  <input
                    type='text'
                    name='name'
                    id='name'
                    placeholder='Isi nama kamu di sini...'
                    className='w-full p-5 rounded-lg'
                    autoFocus
                  />
                </div>

                <div className='input space-y-2'>
                  <label
                    htmlFor='email'
                    className='font-semibold text-xl text-white'
                  >
                    Email
                  </label>

                  <input
                    type='email'
                    name='email'
                    id='email'
                    placeholder='Isi email kamu di sini...'
                    className='w-full p-5 rounded-lg'
                  />
                </div>

                <div className='input space-y-2'>
                  <label
                    htmlFor='password'
                    className='font-semibold text-xl text-white'
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

                <div className='input space-y-2'>
                  <label
                    htmlFor='confirmPassword'
                    className='font-semibold text-xl text-white'
                  >
                    Konfirmasi Password
                  </label>

                  <input
                    type='password'
                    name='confirmPassword'
                    id='confirmPassword'
                    placeholder='Isi password kamu lagi di sini...'
                    className='w-full p-5 rounded-lg'
                  />
                </div>

                <div className='input space-y-2'>
                  <label
                    htmlFor='phoneNumber'
                    className='font-semibold text-xl text-white'
                  >
                    Nomor Telepon <span className='font-light'>(Optional)</span>
                  </label>

                  <input
                    type='text'
                    name='phoneNumber'
                    id='phoneNumber'
                    placeholder='Isi nama kamu di sini...'
                    className='w-full p-5 rounded-lg'
                  />
                </div>
              </div>

              <div className='w-full flex flex-row justify-between gap-x-4'>
                <span className='text-white text-lg'>
                  Sudah punya akun?{' '}
                  <Link to='/login' className='underline underline-offset-4'>
                    Masuk
                  </Link>
                </span>

                <button
                  type='submit'
                  className='px-8 py-4 bg-white font-bold text-xl text-primary text-center rounded-lg'
                >
                  Daftar
                </button>
              </div>
            </form>
          </div>
        </div>
      </XyzTransition>
    </Fragment>
  );
};

export default Register;
