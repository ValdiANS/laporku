import { useState, Fragment, useRef } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { XyzTransition } from '@animxyz/react';

import { API } from '../../lib/api';

import { uiActions } from '../../store/slice/ui-slice';
import { userActions } from '../../store/slice/user-slice';

import Logo from '../../components/SVG/Logo';

const errorType = {
  emailEmpty: 'Email tidak boleh kosong',
  passwordEmpty: 'Password tidak boleh kosong',
  wrongEmailFormat: 'Gunakan format email yang benar',
  wrongPassword: 'Password salah',
};

const checkInputValidity = (email, password) => {
  const inputValidity = {
    valid: true,
    email: {
      valid: true,
      message: '',
    },
    password: {
      valid: true,
      message: '',
    },
  };

  if (email.length === 0) {
    inputValidity.valid = false;
    inputValidity.email.valid = false;
    inputValidity.email.message = errorType.emailEmpty;
  } else if (!email.includes('@')) {
    inputValidity.valid = false;
    inputValidity.email.valid = false;
    inputValidity.email.message = errorType.wrongEmailFormat;
  }

  if (password.length === 0) {
    inputValidity.valid = false;
    inputValidity.password.valid = false;
    inputValidity.password.message = errorType.passwordEmpty;
  }

  return inputValidity;
};

const Login = () => {
  const dispatch = useDispatch();

  const isUserLogin = useSelector((state) => state.user.isLogin);

  const emailRef = useRef();
  const passwordRef = useRef();

  const [isEmailValid, setIsEmailValid] = useState({
    valid: true,
    message: '',
  });
  const [isPasswordValid, setIsPasswordValid] = useState({
    valid: true,
    message: '',
  });
  const [isWrongPassword, setIsWrongPassword] = useState(false);

  const loginSubmitHandler = async (e = new SubmitEvent()) => {
    e.preventDefault();

    setIsEmailValid({
      valid: true,
      message: '',
    });
    setIsPasswordValid({
      valid: true,
      message: '',
    });
    setIsWrongPassword(false);
    dispatch(uiActions.setIsLoading(true));

    const formValidity = checkInputValidity(
      emailRef.current.value,
      passwordRef.current.value
    );

    if (!formValidity.valid) {
      setIsEmailValid(formValidity.email);
      setIsPasswordValid(formValidity.password);

      dispatch(uiActions.setIsLoading(false));
      return;
    }

    try {
      // Login API
      const loginResponse = await API.Login({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      if (loginResponse.errorType === 'wrong-password') {
        setIsWrongPassword(true);
        dispatch(uiActions.setIsLoading(false));

        return;
      }

      if (loginResponse.errorType === 'invalid-account') {
        dispatch(uiActions.showLoginErrorModal());
        dispatch(uiActions.setIsLoading(false));

        return;
      }

      dispatch(userActions.login(loginResponse.data));

      dispatch(uiActions.showLoginSuccessModal());
    } catch (error) {
      console.log('Gagal Login!');
      console.log(error.message);
      console.log('Error');
      console.log(error);

      dispatch(uiActions.showLoginErrorModal());
    }

    dispatch(uiActions.setIsLoading(false));
  };

  return (
    <Fragment>
      {isUserLogin && <Navigate to='/' replace={true} />}

      <XyzTransition appearVisible className='item-group' xyz='fade left-100%'>
        <div className='absolute top-0 left-0 sm:static w-screen h-screen sm:w-auto sm:h-auto z-[99999] sm:z-auto'>
          <div className='w-full sm:w-[600px] h-full p-8 bg-primaryGradient flex flex-col gap-y-8'>
            <Link to='/'>
              <Logo className='w-full max-w-[150px] sm:max-w-[250px] h-fit' />
            </Link>

            <form
              onSubmit={loginSubmitHandler}
              className='w-full flex flex-col gap-y-6'
            >
              <h1 className='font-bold text-3xl text-white text-center'>
                Selamat Datang
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
                    ref={emailRef}
                    type='text'
                    name='email'
                    id='email'
                    placeholder='Isi email kamu di sini...'
                    className={`w-full p-5 rounded-lg border-2 border-solid ${
                      isEmailValid.valid
                        ? ''
                        : 'border-[#FF0000] placeholder:text-[#FF0000]'
                    }`}
                    autoFocus
                  />

                  {!isEmailValid.valid && (
                    <small className='block text-base text-[#FF0000]'>
                      {isEmailValid.message}
                    </small>
                  )}
                </div>

                <div className='input space-y-2'>
                  <label
                    htmlFor='password'
                    className='font-semibold text-2xl text-white'
                  >
                    Password
                  </label>

                  <input
                    ref={passwordRef}
                    type='password'
                    name='password'
                    id='password'
                    placeholder='Isi password kamu di sini...'
                    className={`w-full p-5 rounded-lg border-2 border-solid ${
                      isPasswordValid.valid
                        ? ''
                        : 'border-[#FF0000] placeholder:text-[#FF0000]'
                    }`}
                  />

                  {!isPasswordValid.valid && !isWrongPassword && (
                    <small className='block text-base text-[#FF0000]'>
                      {isPasswordValid.message}
                    </small>
                  )}

                  {isWrongPassword && (
                    <small className='block text-base text-[#FF0000]'>
                      {errorType.wrongPassword}
                    </small>
                  )}
                </div>
              </div>

              <div className='w-full flex flex-row justify-between gap-x-4'>
                <span className='text-white text-lg'>
                  Belum punya akun?{' '}
                  <Link to='/register' className='underline underline-offset-4'>
                    Daftar
                  </Link>
                </span>

                <button
                  type='submit'
                  className='px-8 py-4 bg-white font-bold text-xl text-primary text-center rounded-lg transition-all hover:-translate-y-1 active:translate-y-0 hover:brightness-110 active:brightness-100'
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

export default Login;
