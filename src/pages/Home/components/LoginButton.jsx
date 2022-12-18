import { Link } from 'react-router-dom';

const LoginButton = ({ type = 'user' || 'admin' }) => (
  <Link
    to={`/${
      type === 'user' ? 'login' : type === 'admin' ? 'admin/login' : 'login'
    }`}
    className='w-full h-fit py-4 px-8 bg-primaryGradient flex flex-row items-center justify-center gap-4 rounded-2xl z-[99999] font-bold text-2xl text-center transition-all hover:-translate-y-1 active:translate-y-0 hover:brightness-105 active:brightness-100'
  >
    <span className='text-white'>Login</span>
  </Link>
);

export default LoginButton;
