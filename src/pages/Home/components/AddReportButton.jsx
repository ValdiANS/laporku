import { XyzTransition } from '@animxyz/react';

import PlusLargeIcon from '../../../components/SVG/PlusLargeIcon';

const AddReportButton = ({
  show = true,
  onClick = (e = new MouseEvent('click')) => {},
}) => (
  <XyzTransition appearVisible className='item-group' xyz='fade right-100%'>
    {show && (
      <button
        onClick={onClick}
        className='w-full h-fit py-2 px-4 bg-primaryGradient flex flex-row items-center justify-center gap-4 rounded-2xl z-[99999] transition-all hover:-translate-y-1 active:translate-y-0 hover:brightness-105'
      >
        <PlusLargeIcon />

        <span className='font-bold text-2xl text-white text-left'>
          Buat <br /> Laporan
        </span>
      </button>
    )}
  </XyzTransition>
);

export default AddReportButton;
