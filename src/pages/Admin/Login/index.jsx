import { Fragment, useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { XyzTransition } from '@animxyz/react';

import { API } from '../../../lib/api';
import { uiActions } from '../../../store/slice/ui-slice';
import { userActions } from '../../../store/slice/user-slice';

import Logo from '../../../components/SVG/Logo';

const errorType = {
  emailEmpty: 'Email tidak boleh kosong',
  passowrdEmpty: 'Password tidak boleh kosong',
  wrongEmailFormat: 'Gunakan format email yang benar',
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
    inputValidity.password.message = errorType.passowrdEmpty;
  }

  return inputValidity;
};

const AdminLogin = () => {
  const dispatch = useDispatch();

  const isUserLogin = useSelector((state) => state.user.isLogin);
  const isUserAdmin = useSelector((state) => state.user.user.isAdmin);

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
      const loginAdminResponse = await API.LoginAdmin({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      if (!loginAdminResponse.response.ok) {
        throw new Error(loginAdminResponse.json.message);
      }

      if (loginAdminResponse.json.errorType === 'invalid-account') {
        dispatch(uiActions.showLoginErrorModal());
        dispatch(uiActions.setIsLoading(false));

        return;
      }

      dispatch(userActions.login(loginAdminResponse.json.data));

      dispatch(uiActions.showLoginSuccessModal());

      // remove local USER_ID if already logged in as normal user
      localStorage.removeItem('USER_ID');
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
      {isUserLogin && isUserAdmin && (
        <Navigate to='/admin/dashboard' replace={true} />
      )}

      <div className='w-full h-full min-h-screen bg-primaryGradient overflow-y-auto flex flex-row justify-center'>
        <XyzTransition
          appearVisible
          className='item-group'
          xyz='fade down-100%'
        >
          <div className='w-full h-full min-h-screen'>
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

                    {!isPasswordValid.valid && (
                      <small className='block text-base text-[#FF0000]'>
                        {isPasswordValid.message}
                      </small>
                    )}
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
      </div>
    </Fragment>
  );
};

export default AdminLogin;
