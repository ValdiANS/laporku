import { useDispatch } from 'react-redux';
import { useMapEvents } from 'react-leaflet';

import { XyzTransition } from '@animxyz/react';
import { uiActions } from '../store/slice/ui-slice';

const modalType = {
  addReportSuccess: {
    title: 'Laporan Berhasil Ditambahkan!',
  },

  addReportError: {
    title: 'Laporan Gagal Ditambahkan!',
  },

  registerSuccess: {
    title: 'Berhasil Daftar Akun!',
  },

  registerError: {
    title: 'Gagal Daftar Akun!',
  },

  loginSuccess: {
    title: 'Berhasil Masuk!',
  },

  loginError: {
    title: 'Gagal Login! Akun tidak ada!',
  },

  addReport: {
    title: 'Klik lokasi yang ingin dilaporkan!',
  },

  getAllReportsError: {
    title: 'Gagal Mendapatkan Semua Laporan!',
  },

  getReportError: {
    title: 'Gagal Mendapatkan Data Laporan!',
  },

  userNotLoginError: {
    title: 'Login diperlukan untuk memberikan penilaian pada laporan!',
  },

  userNotLoginReportInvalidReportError: {
    title: 'Login diperlukan untuk melaporkan laporan yang tidak valid!',
  },

  voteError: {
    title: 'Gagal Memberikan Vote Pada Laporan!',
  },

  invalidReportError: {
    title: 'Gagal Melaporkan! Periksa Koneksi Internet!',
  },

  invalidReportAccepted: {
    title: 'Laporan Diterima!',
  },

  getInvalidReportsError: {
    title: 'Gagal Mendapatkan Data Laporan yang Tidak Valid!',
  },

  deleteReportSuccess: {
    title: 'Berhasil Menghapus Laporan!',
  },

  deleteReportError: {
    title: 'Gagal Menghapus Laporan!',
  },

  getUserLocationError: {
    title:
      'Gagal Mendapatkan Lokasi Pengguna! Izinkan Website Untuk Mengakses Lokasi!',
  },
};

const Modal = ({
  show = false,
  type = '',
  isAddingReport = false,
  onSelectLocation = (lat, lng) => {},
}) => {
  const dispatch = useDispatch();

  let map = '';

  if (type === 'addReport') {
    map = useMapEvents({
      locationfound: (e) => {
        if (!isAddingReport) {
          return;
        }

        console.log('my location found');

        onSelectLocation(e.latlng.lat, e.latlng.lng);
      },

      locationerror: (e) => {
        if (!isAddingReport) {
          return;
        }

        console.log('location error');

        dispatch(uiActions.showGetUserLocationErrorModal());
      },
    });
  }

  const isAddingReportModalClassName =
    type === 'addReport'
      ? 'absolute top-16 left-1/2 -translate-x-1/2'
      : 'absolute top-0 left-0 w-screen h-screen grid place-items-center px-8';

  const closeModalClickHandler = () => {
    dispatch(uiActions.hideInfoModal());
  };

  const useCurrentPositionClickHandler = () => {
    map.locate({
      setView: true,
    });
  };

  return (
    <XyzTransition
      appearVisible
      className='item-group'
      xyz='fade in-down-100% out-up-100%'
    >
      {show && (
        <div className={`${isAddingReportModalClassName} z-[99999]`}>
          <div className='modal-container w-full max-w-[600px] px-4 py-8 bg-white/60 rounded-lg border-2 border-solid border-[#626262] backdrop-blur-sm flex flex-col justify-center items-center gap-y-8'>
            <h2 className='font-bold text-3xl text-primary text-center'>
              {modalType[type].title}
            </h2>

            {type === 'addReport' && (
              <button
                onClick={useCurrentPositionClickHandler}
                className='px-8 py-4 bg-primaryGradient font-bold text-xl rounded-lg text-[#F7F7F7] transition-all hover:-translate-y-1 active:translate-y-0 hover:brightness-110'
              >
                Gunakan Lokasimu Saat Ini!
              </button>
            )}

            {type !== 'addReport' && (
              <button
                onClick={closeModalClickHandler}
                className='px-14 py-3 bg-[#626262] font-bold text-xl text-[#F7F7F7] text-center rounded-lg transition-all hover:-translate-y-1 active:translate-y-0 hover:brightness-125'
              >
                Tutup
              </button>
            )}
          </div>
        </div>
      )}
    </XyzTransition>
  );
};

export default Modal;
