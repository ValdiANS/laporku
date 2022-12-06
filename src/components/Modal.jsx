import { XyzTransition } from '@animxyz/react';

const modalType = {
  addReportSuccess: {
    title: 'Laporan Berhasil Ditambahkan',
  },

  registerSuccess: {
    title: 'Berhasil Daftar',
  },

  loginSuccess: {
    title: 'Berhasil Masuk',
  },
};

const Modal = ({ show = false, type = '', onClose = () => {} }) => {
  return (
    <XyzTransition
      appearVisible
      className='item-group'
      xyz='fade in-down-100% out-up-100%'
    >
      {show && (
        <div className='z-[99999]'>
          <div className='absolute top-0 left-0 w-screen h-screen grid place-items-center'>
            <div className='modal-container px-4 py-8 bg-white/60 rounded-lg border-2 border-solid border-[#626262] backdrop-blur-sm flex flex-col justify-center items-center gap-y-8'>
              <h2 className='font-bold text-3xl text-primary text-center'>
                {modalType[type].title}
              </h2>

              <button className='px-14 py-3 bg-[#626262] font-bold text-xl text-[#F7F7F7] text-center rounded-lg transition-all hover:-translate-y-1 active:translate-y-0 hover:brightness-125'>
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </XyzTransition>
  );
};

export default Modal;
