import { XyzTransition } from '@animxyz/react';

import Logo from './SVG/Logo';

const LoadingScreen = ({ show = true }) => (
  <XyzTransition
    appearVisible
    className='item-group'
    xyz='fade in-down-100% out-up-100%'
  >
    {show && (
      <div className='w-screen h-screen absolute top-0 left-0 bg-primaryGradient grid place-items-center p-8 z-[99999] sm:z-auto'>
        <Logo className='w-full max-w-[550px] h-fit animate-pulse' />
      </div>
    )}
  </XyzTransition>
);

export default LoadingScreen;
