import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { XyzTransition } from '@animxyz/react';

import Logo from '../../../components/SVG/Logo';
import CaretDownIcon from '../../../components/SVG/CaretDownIcon';
import DownloadIcon from '../../../components/SVG/DownloadIcon';
import CloseCrossIcon from '../../../components/SVG/CloseCrossIcon';

import DefaultAvatar from '../../../assets/image/default-avatar.png';

const damageReportTypes = [
  {
    name: 'Kerusakan Jalan (Kendaran)',
    value: 'roadDamage',
  },

  {
    name: 'Kerusakan Jalan (Pejalan Kaki)',
    value: 'pavementDamage',
  },

  {
    name: 'Kerusakan Lingkungan',
    value: 'environmentDamage',
  },

  {
    name: 'Kebakaran',
    value: 'fire',
  },

  {
    name: 'Kerusakan Fasilitas Air',
    value: 'waterFacilityDamage',
  },

  {
    name: 'Kerusakan Kelistrikan',
    value: 'electricityDamage',
  },

  {
    name: 'Kerusakan Fasilitas Transportasi',
    value: 'publicTransportationDamage',
  },

  {
    name: 'Kerusakan Fasilitas Umumm',
    value: 'publicFacilityDamage',
  },
];

const AddReportSidebar = ({ show = false, onClose = () => {} }) => {
  const [reportTitle, setReportTitle] = useState('');
  const [selectedType, setSelectedType] = useState(damageReportTypes[0].value);
  const [uploadedImg, setUploadedImg] = useState('');
  const [reportDescription, setReportDescription] = useState('');

  const [imgFileName, setImgFileName] = useState('');

  // console.log(uploadedImg === '' ? uploadedImg : uploadedImg?.files[0]);

  const addReportForm = useRef();

  const reportTitleChangeHandler = (e) => {
    setReportTitle(e.target.value);
  };

  const selectDamageReportChangeHandler = (e) => {
    setSelectedType(e.target.value);
  };

  const uploadedImgChangeHandler = (e) => {
    // console.log(e.target.files[0]);

    console.log(e.target.files);

    if (e.target.files.length === 0) {
      setUploadedImg('');
      setImgFileName('');

      return;
    }

    setUploadedImg(e.target);
    setImgFileName(e.target.files[0].name);
  };

  const reportDescriptionChangeHandler = (e) => {
    setReportDescription(e.target.value);
  };

  const addReportSubmitHandler = (e = new SubmitEvent()) => {
    e.preventDefault();
  };

  const addReportResetHandler = () => {
    setReportTitle('');
    setSelectedType(damageReportTypes[0].value);
    setUploadedImg('');
    setImgFileName('');
    setReportDescription('');
  };

  const closeClickHandler = () => {
    addReportResetHandler();

    onClose();
  };

  return (
    <XyzTransition appearVisible className='item-group' xyz='fade left-100%'>
      {show && (
        <div className='absolute top-0 left-0 sm:static w-screen h-screen sm:w-[600px] sm:h-auto z-[99999] sm:z-auto'>
          <div className='w-screen sm:w-[600px] p-8 bg-primaryGradient flex flex-col gap-y-8 relative'>
            <div className='flex flex-row justify-between items-center gap-x-8'>
              <Link to='/'>
                <Logo className='w-full max-w-[150px] sm:max-w-[250px] h-fit' />
              </Link>

              {/* Close Button */}
              <button
                onClick={closeClickHandler}
                className='bg-[#FF5454] p-3 rounded-lg transition-all hover:-translate-y-1 active:translate-y-0'
              >
                <CloseCrossIcon className='w-full aspect-square' />
              </button>
            </div>

            <div className='flex flex-col gap-y-4'>
              <div className='flex flex-row items-center gap-x-4'>
                <div className='w-[70px] aspect-square rounded-full overflow-hidden border-2 border-solid border-secondary'>
                  <img src={DefaultAvatar} alt="User's Avatar" />
                </div>

                <h3 className='font-bold text-2xl text-white'>User123</h3>
              </div>

              <form
                ref={addReportForm}
                onSubmit={addReportSubmitHandler}
                onReset={addReportResetHandler}
                className='flex flex-col gap-y-5'
              >
                <h1 className='font-bold text-3xl text-white text-center'>
                  Ayo Buat Laporan!
                </h1>

                <div className='input-container w-full flex flex-col gap-y-4'>
                  <div className='input space-y-2'>
                    <label
                      htmlFor='title'
                      className='font-semibold text-2xl text-white'
                    >
                      Judul Laporan
                    </label>

                    <input
                      type='text'
                      name='title'
                      id='title'
                      value={reportTitle}
                      onChange={reportTitleChangeHandler}
                      placeholder='Isi judul laporan di sini...'
                      className='w-full p-5 rounded-lg'
                      autoFocus
                    />
                  </div>

                  <div className='flex flex-row gap-x-4 justify-between'>
                    <div className='input-container w-full flex flex-col sm:flex-row gap-x-4 gap-y-4'>
                      <div className='input w-full flex flex-row relative'>
                        <select
                          name='damageType'
                          id='damageType'
                          className='w-full h-full p-5 pr-12 rounded-lg text-primary cursor-pointer text-ellipsis'
                          onChange={selectDamageReportChangeHandler}
                          value={selectedType}
                          title={
                            selectedType === ''
                              ? 'Jenis Kerusakan'
                              : damageReportTypes.find(
                                  (damageReportType) =>
                                    selectedType === damageReportType.value
                                ).name
                          }
                          style={{
                            WebkitAppearance: 'none',
                            MozAppearance: 'none',
                          }}
                        >
                          <option value='' disabled>
                            Jenis Kerusakan
                          </option>

                          {damageReportTypes.map((damageReportType, idx) => (
                            <option
                              key={idx}
                              value={damageReportType.value}
                              disabled={damageReportType.isDisabled}
                            >
                              {damageReportType.name}
                            </option>
                          ))}
                        </select>

                        <CaretDownIcon className='absolute right-5 top-1/2 -translate-y-1/2' />
                      </div>

                      <div className='input w-full'>
                        <input
                          type={'file'}
                          name='reportPhoto'
                          id='reportPhoto'
                          accept='image/png, image/jpeg, image/jpg'
                          onChange={uploadedImgChangeHandler}
                          className='hidden'
                        />

                        <label
                          htmlFor='reportPhoto'
                          className='w-full'
                          title={imgFileName}
                        >
                          <div className='w-full p-5 rounded-lg bg-white text-primary flex flex-row justify-between items-center gap-x-4 cursor-pointer'>
                            <span
                              className='text-ellipsis overflow-hidden w-fit'
                              style={{
                                display: '-webkit-box',
                                WebkitLineClamp: 1,
                                WebkitBoxOrient: 'vertical',
                              }}
                            >
                              {imgFileName === ''
                                ? 'Unggah Gambar'
                                : imgFileName}
                            </span>

                            <DownloadIcon className='w-auto h-[30px] sm:h-[40px]' />
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className='input space-y-2'>
                    <label
                      htmlFor='Description'
                      className='font-semibold text-2xl text-white'
                    >
                      Deskripsi Laporan
                    </label>

                    <textarea
                      name='title'
                      id='title'
                      value={reportDescription}
                      onChange={reportDescriptionChangeHandler}
                      rows={5}
                      placeholder='Isi deskripsi di sini...'
                      className='w-full p-5 rounded-lg'
                    />
                  </div>
                </div>

                <div className='btn-container w-full flex flex-row justify-end gap-x-4'>
                  <button
                    type='reset'
                    className='px-8 py-4 font-bold text-secondary text-center text-xl bg-[#FF5454] rounded-lg transition-all hover:-translate-y-1 active:translate-y-0 hover:brightness-110 active:brightness-100'
                  >
                    Reset
                  </button>

                  <button
                    type='submit'
                    className='px-8 py-4 font-bold text-primary text-center text-xl bg-white rounded-lg transition-all hover:-translate-y-1 active:translate-y-0 hover:brightness-110 active:brightness-100'
                  >
                    Laporkan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </XyzTransition>
  );
};

export default AddReportSidebar;
