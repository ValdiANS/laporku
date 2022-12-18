import { Fragment, useRef, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { XyzTransition } from '@animxyz/react';

import { API } from '../../lib/api';

import { uiActions } from '../../store/slice/ui-slice';

import Logo from '../../components/SVG/Logo';

const errorType = {
  nameEmpty: 'Nama tidak boleh kosong',
  emailEmpty: 'Email tidak boleh kosong',
  passowrdEmpty: 'Password tidak boleh kosong',
  passwordTooShort: 'Password setidaknya terdiri dari 8 karakter',
  confirmationPasswordEmpty: 'Konfirmasi password tidak boleh kosong',
  wrongEmailFormat: 'Gunakan format email yang benar',
  wrongConfirmationPassword: 'Konfirmasi password tidak sesuai dengan password',
};

const checkInputValidity = (name, email, password, confirmationPassword) => {
  const inputValidity = {
    valid: true,
    name: {
      valid: true,
      message: '',
    },
    email: {
      valid: true,
      message: '',
    },
    password: {
      valid: true,
      message: '',
    },
    confirmationPassword: {
      valid: true,
      message: '',
    },
  };

  if (name.length === 0) {
    inputValidity.valid = false;
    inputValidity.name.valid = false;
    inputValidity.name.message = errorType.nameEmpty;
  }

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
  } else if (password.length < 8) {
    inputValidity.valid = false;
    inputValidity.password.valid = false;
    inputValidity.password.message = errorType.passwordTooShort;
  }

  if (confirmationPassword.length === 0) {
    inputValidity.valid = false;
    inputValidity.confirmationPassword.valid = false;
    inputValidity.confirmationPassword.message =
      errorType.confirmationPasswordEmpty;
  } else if (confirmationPassword !== password) {
    inputValidity.valid = false;
    inputValidity.confirmationPassword.valid = false;
    inputValidity.confirmationPassword.message =
      errorType.wrongConfirmationPassword;
  }

  return inputValidity;
};

// Minimal Password Length
const minimumPasswordLength = 8;

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isUserLogin = useSelector((state) => state.user.isLogin);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmationPasswordRef = useRef();
  const phoneNumberRef = useRef();

  const [isNameValid, setIsNameValid] = useState({
    valid: true,
    message: '',
  });
  const [isEmailValid, setIsEmailValid] = useState({
    valid: true,
    message: '',
  });
  const [isPasswordValid, setIsPasswordValid] = useState({
    valid: true,
    message: '',
  });
  const [isConfirmationPasswordValid, setIsConfirmationPasswordValid] =
    useState({
      valid: true,
      message: '',
    });

  const registerSubmitHandler = async (e = new SubmitEvent()) => {
    e.preventDefault();

    dispatch(uiActions.setIsLoading(true));

    const formValidity = checkInputValidity(
      nameRef.current.value,
      emailRef.current.value,
      passwordRef.current.value,
      confirmationPasswordRef.current.value
    );

    if (!formValidity.valid) {
      setIsNameValid(formValidity.name);
      setIsEmailValid(formValidity.email);
      setIsPasswordValid(formValidity.password);
      setIsConfirmationPasswordValid(formValidity.confirmationPassword);

      dispatch(uiActions.setIsLoading(false));
      return;
    }

    try {
      // Register API
      const registerResponse = await API.Register({
        email: emailRef.current.value,
        name: nameRef.current.value,
        password: passwordRef.current.value,
        phoneNumber: phoneNumberRef.current.value,
      });

      if (!registerResponse.response.ok) {
        throw new Error(
          JSON.stringify({
            message: 'Gagal Melakukan Register Akun',
            ...registerResponse.json,
          })
        );
      }

      navigate('/', { replace: true });
      dispatch(uiActions.showRegisterSuccessModal());
    } catch (error) {
      const parsedError = JSON.parse(error.message);

      console.log('Gagal Daftar Akun!');
      console.log(parsedError.message);
      console.log('Error');
      console.log(parsedError);

      if (parsedError.errorType === 'email-already-used') {
        setIsEmailValid({
          valid: false,
          message: 'Email telah digunakan!',
        });
      } else {
        dispatch(uiActions.showRegisterErrorModal());
      }
    }

    dispatch(uiActions.setIsLoading(false));
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
              onSubmit={registerSubmitHandler}
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
                    ref={nameRef}
                    type='text'
                    name='name'
                    id='name'
                    placeholder='Isi nama kamu di sini...'
                    className={`w-full p-5 rounded-lg border-2 border-solid ${
                      isNameValid.valid
                        ? ''
                        : 'border-[#FF0000] placeholder:text-[#FF0000]'
                    }`}
                    autoFocus
                  />

                  {!isNameValid.valid && (
                    <small className='block text-base text-[#FF0000]'>
                      {isNameValid.message}
                    </small>
                  )}
                </div>

                <div className='input space-y-2'>
                  <label
                    htmlFor='email'
                    className='font-semibold text-xl text-white'
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
                    className='font-semibold text-xl text-white'
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

                <div className='input space-y-2'>
                  <label
                    htmlFor='confirmPassword'
                    className='font-semibold text-xl text-white'
                  >
                    Konfirmasi Password
                  </label>

                  <input
                    ref={confirmationPasswordRef}
                    type='password'
                    name='confirmPassword'
                    id='confirmPassword'
                    placeholder='Isi password kamu lagi di sini...'
                    className={`w-full p-5 rounded-lg border-2 border-solid ${
                      isConfirmationPasswordValid.valid
                        ? ''
                        : 'border-[#FF0000] placeholder:text-[#FF0000]'
                    }`}
                  />

                  {!isConfirmationPasswordValid.valid && (
                    <small className='block text-base text-[#FF0000]'>
                      {isConfirmationPasswordValid.message}
                    </small>
                  )}
                </div>

                <div className='input space-y-2'>
                  <label
                    htmlFor='phoneNumber'
                    className='font-semibold text-xl text-white'
                  >
                    Nomor Telepon <span className='font-light'>(Optional)</span>
                  </label>

                  <input
                    ref={phoneNumberRef}
                    type='number'
                    name='phoneNumber'
                    id='phoneNumber'
                    placeholder='Isi nomor telepon'
                    className='w-full p-5 rounded-lg'
                    inputMode='numeric'
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
                  className='px-8 py-4 bg-white font-bold text-xl text-primary text-center rounded-lg transition-all hover:-translate-y-1 active:translate-y-0 hover:brightness-110 active:brightness-100'
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
