import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { XyzTransition } from '@animxyz/react';

import { API } from '../../../lib/api';

import { locationActions } from '../../../store/slice/location-slice';
import { uiActions } from '../../../store/slice/ui-slice';
import { reportsActions } from '../../../store/slice/reports-slice';

import Logo from '../../../components/SVG/Logo';
import CaretDownIcon from '../../../components/SVG/CaretDownIcon';
import DownloadIcon from '../../../components/SVG/DownloadIcon';
import CloseCrossIcon from '../../../components/SVG/CloseCrossIcon';

import DefaultAvatar from '../../../assets/image/default-avatar.png';

const damageReportTypes = [
  {
    name: 'Kerusakan Jalan (Kendaran)',
    value: 'road-damage',
  },

  {
    name: 'Kerusakan Jalan (Pejalan Kaki)',
    value: 'pavement-damage',
  },

  {
    name: 'Kerusakan Lingkungan',
    value: 'environment-damage',
  },

  {
    name: 'Kebakaran',
    value: 'fire',
  },

  {
    name: 'Kerusakan Fasilitas Air',
    value: 'water-damage',
  },

  {
    name: 'Kerusakan Kelistrikan',
    value: 'electricity-damage',
  },

  {
    name: 'Kerusakan Fasilitas Transportasi',
    value: 'transportation-facility-damage',
  },

  {
    name: 'Kerusakan Fasilitas Umum',
    value: 'public-facility-damage',
  },
];

const errorType = {
  titleEmpty: 'Judul laporan tidak boleh kosong',
  imageEmpty: 'Gambar laporan tidak boleh kosong',
  descriptionEmpty: 'Deskripsi laporan tidak boleh kosong',
};

const checkInputValidity = (title, description, uploadedImg) => {
  const inputValidity = {
    valid: true,
    title: {
      valid: true,
      message: '',
    },
    description: {
      valid: true,
      message: '',
    },
    uploadedImg: {
      valid: true,
      message: '',
    },
  };

  if (title.length === 0) {
    inputValidity.valid = false;
    inputValidity.title.valid = false;
    inputValidity.title.message = errorType.titleEmpty;
  }

  if (description.length === 0) {
    inputValidity.valid = false;
    inputValidity.description.valid = false;
    inputValidity.description.message = errorType.descriptionEmpty;
  }

  if (uploadedImg === '') {
    inputValidity.valid = false;
    inputValidity.uploadedImg.valid = false;
    inputValidity.uploadedImg.message = errorType.imageEmpty;
  }

  return inputValidity;
};

const AddReportSidebar = ({ show = false, onClose = () => {} }) => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user.user);

  const selectedAddedReportCoordinate = useSelector(
    (state) => state.location.selectedLocation
  );

  const [reportTitle, setReportTitle] = useState('');
  const [selectedType, setSelectedType] = useState(damageReportTypes[0].value);
  const [uploadedImg, setUploadedImg] = useState('');
  const [reportDescription, setReportDescription] = useState('');

  const [imgFileName, setImgFileName] = useState('');

  const [imgReaderResult, setImgReaderResult] = useState('');

  // FileReader
  const reader = new FileReader();

  reader.onload = (e) => {
    setImgReaderResult(reader.result);
  };

  const [isTitleValid, setIsTitleValid] = useState({
    valid: true,
    message: '',
  });

  const [isDescriptionValid, setIsDescriptionValid] = useState({
    valid: true,
    message: '',
  });

  const [isUploadedImgValid, setIsUploadedImgValid] = useState({
    valid: true,
    message: '',
  });

  // Get All Reports
  const getAllReports = useCallback(async () => {
    try {
      const getAllReportsResponse = await API.GetAllReports();

      if (!getAllReportsResponse.response.ok) {
        throw new Error(getAllReportsResponse.json.message);
      }

      dispatch(
        reportsActions.setReports(getAllReportsResponse.json.data.reports)
      );
    } catch (error) {
      console.log('Gagal mendapatkan semua laporan!');
      console.log(error.message);
      console.log(error);

      dispatch(uiActions.showGetAllReportsErrorModal());
    }
  }, []);

  const reportTitleChangeHandler = (e) => {
    setReportTitle(e.target.value);
  };

  const selectDamageReportChangeHandler = (e) => {
    setSelectedType(e.target.value);
  };

  const uploadedImgChangeHandler = (e) => {
    if (e.target.files.length === 0) {
      setUploadedImg('');
      setImgFileName('');

      return;
    }

    setUploadedImg(e.target);
    setImgFileName(e.target.files[0].name);
    reader.readAsDataURL(e.target.files[0]);
  };

  const reportDescriptionChangeHandler = (e) => {
    setReportDescription(e.target.value);
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

    dispatch(locationActions.setSelectedLocation([]));
  };

  const addReportSubmitHandler = async (e = new SubmitEvent()) => {
    e.preventDefault();
    dispatch(uiActions.setIsLoading(true));

    const formValidity = checkInputValidity(
      reportTitle,
      reportDescription,
      uploadedImg
    );

    if (!formValidity.valid) {
      setIsTitleValid(formValidity.title);
      setIsDescriptionValid(formValidity.description);
      setIsUploadedImgValid(formValidity.uploadedImg);

      dispatch(uiActions.setIsLoading(false));

      return;
    }

    const base64ImgString = imgReaderResult.split(',')[1];

    try {
      const uploadImgToImgBB = await API.SaveImageToImgBB(base64ImgString);

      const newReportData = {
        userId: userData.id,
        uploaderName: userData.name,
        type: selectedType,
        coordinate: {
          lat: selectedAddedReportCoordinate[0],
          lng: selectedAddedReportCoordinate[1],
        },
        title: reportTitle,
        description: reportDescription,
        image: {
          url: uploadImgToImgBB.data.url,
          delete_url: uploadImgToImgBB.data.delete_url,
        },
      };

      // Add Report API
      const addReportResponse = await API.AddReport(newReportData);

      if (!addReportResponse.response.ok) {
        throw new Error(
          JSON.stringify({
            message: 'Gagal Menambahkan Laporan!',
            ...addReportResponse.json,
          })
        );
      }

      await getAllReports();

      dispatch(uiActions.showAddReportSuccessModal());

      closeClickHandler();
    } catch (error) {
      console.log(error);

      dispatch(uiActions.showAddReportErrorModal());
    }

    dispatch(uiActions.setIsLoading(false));
  };

  return (
    <XyzTransition appearVisible className='item-gr oup' xyz='fade left-100%'>
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

                <h3 className='font-bold text-2xl text-white'>
                  {userData?.name}
                </h3>
              </div>

              <form
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
                      className={`w-full p-5 rounded-lg border-2 border-solid ${
                        isTitleValid.valid
                          ? ''
                          : 'border-[#FF0000] placeholder:text-[#FF0000]'
                      }`}
                      autoFocus
                    />

                    {!isTitleValid.valid && (
                      <small className='block text-base text-[#FF0000]'>
                        {isTitleValid.message}
                      </small>
                    )}
                  </div>

                  <div className='flex flex-row gap-x-4 justify-between'>
                    <div className='input-container w-full flex flex-col sm:flex-row gap-x-4 gap-y-4'>
                      <div className='input w-full flex flex-row relative flex-grow'>
                        <select
                          name='damageType'
                          id='damageType'
                          className='w-full h-full p-5 pr-12 rounded-lg text-primary cursor-pointer text-ellipsis'
                          onChange={selectDamageReportChangeHandler}
                          value={selectedType}
                          required
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

                      <div className='input w-full flex-grow'>
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
                          <div
                            className={`w-full p-5 rounded-lg bg-white flex flex-row justify-between items-center gap-x-4 cursor-pointer border-2 border-solid ${
                              isUploadedImgValid.valid
                                ? 'text-primary'
                                : 'border-[#FF0000] text-[#FF0000]'
                            }`}
                          >
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

                            <DownloadIcon
                              className='w-auto h-[30px] sm:h-[40px]'
                              error={!isUploadedImgValid.valid}
                            />
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className='-mt-2 flex flex-row gap-x-4 justify-between'>
                    <div className='hidden sm:block w-full'></div>

                    {!isUploadedImgValid.valid && (
                      <small className='w-full block text-base text-[#FF0000]'>
                        Gambar laporan tidak boleh kosong
                      </small>
                    )}
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
                      className={`w-full p-5 rounded-lg border-2 border-solid ${
                        isDescriptionValid.valid
                          ? ''
                          : 'border-[#FF0000] placeholder:text-[#FF0000]'
                      }`}
                    />

                    {!isDescriptionValid.valid && (
                      <small className='block text-base text-[#FF0000]'>
                        {isDescriptionValid.message}
                      </small>
                    )}
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
