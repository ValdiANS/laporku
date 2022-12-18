import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { XyzTransition } from '@animxyz/react';

import { API } from '../../../lib/api';
import { uiActions } from '../../../store/slice/ui-slice';
import { userActions } from '../../../store/slice/user-slice';

import SidebarLoadingScreen from '../../../components/SidebarLoadingScreen';

import Logo from '../../../components/SVG/Logo';
import CloseCrossIcon from '../../../components/SVG/CloseCrossIcon';
import ThumbsUpOutlineIcon from '../../../components/SVG/ThumbsUpOutlineIcon';
import ThumbsUpFilledIcon from '../../../components/SVG/ThumbsUpFilledIcon';
import ThumbsDownOutlineIcon from '../../../components/SVG/ThumbsDownOutlineIcon';
import ThumbsDownFilledIcon from '../../../components/SVG/ThumbsDownFilledIcon';
import ReportIcon from '../../../components/SVG/ReportIcon';

import DefaultAvatar from '../../../assets/image/default-avatar.png';

const ViewReportSidebar = () => {
  const { reportId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isUserLogin = useSelector((state) => state.user.isLogin);
  const userData = useSelector((state) => state.user.user);

  const [reportData, setReportData] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  const [isVoted, setIsVoted] = useState(false);
  const [vote, setVote] = useState(''); // -> 'up' or 'down'

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const getReport = async () => {
    try {
      const getReportResponse = await API.GetReport(reportId);

      if (!getReportResponse.response.ok) {
        throw new Error(getReportResponse.json.message);
      }

      setReportData(getReportResponse.json.data);
    } catch (error) {
      dispatch(uiActions.showGetReportErrorModal());

      navigate('/');
    }
  };

  useEffect(() => {
    const fetchReportData = async () => {
      setIsLoading(true);

      await getReport();

      if (isUserLogin) {
        const isReportRated = userData.ratedReport.find(
          (ratedReport) => ratedReport.reportId === reportId
        );

        setIsVoted(!!isReportRated);
        setVote(!!isReportRated ? isReportRated.vote : '');
      }

      setIsLoading(false);
    };

    fetchReportData();
  }, [reportId]);

  const upvoteReport = useCallback(async () => {
    const upvoteReportResponse = await API.VoteReport({
      userId: userData.id,
      reportId,
      vote: 'up',
      type: 'increment',
      isAdmin: !!userData?.isAdmin,
    });

    if (!upvoteReportResponse.response.ok) {
      throw new Error(upvoteReportResponse.json.message);
    }

    dispatch(
      userActions.addRatedReport({
        reportId,
        vote: 'up',
      })
    );

    setReportData((prevReportData) => ({
      ...prevReportData,
      rating: {
        ...prevReportData.rating,
        voteUp: prevReportData.rating.voteUp + 1,
      },
    }));
  }, []);

  const downvoteReport = useCallback(async () => {
    const downvoteReportResponse = await API.VoteReport({
      userId: userData.id,
      reportId,
      vote: 'down',
      type: 'increment',
      isAdmin: !!userData?.isAdmin,
    });

    if (!downvoteReportResponse.response.ok) {
      throw new Error(downvoteReportResponse.json.message);
    }

    dispatch(
      userActions.addRatedReport({
        reportId,
        vote: 'down',
      })
    );

    setReportData((prevReportData) => ({
      ...prevReportData,
      rating: {
        ...prevReportData.rating,
        voteDown: prevReportData.rating.voteDown + 1,
      },
    }));
  }, []);

  const unUpvoteReport = useCallback(async () => {
    const unUpvoteReportResponse = await API.VoteReport({
      userId: userData.id,
      reportId,
      vote: 'up',
      type: 'decrement',
      isAdmin: !!userData?.isAdmin,
    });

    if (!unUpvoteReportResponse.response.ok) {
      throw new Error(unUpvoteReportResponse.json.message);
    }

    dispatch(
      userActions.deleteRatedReport({
        reportId,
      })
    );

    setReportData((prevReportData) => ({
      ...prevReportData,
      rating: {
        ...prevReportData.rating,
        voteUp: prevReportData.rating.voteUp - 1,
      },
    }));
  }, []);

  const unDownvoteReport = useCallback(async () => {
    const unDownvoteReportResponse = await API.VoteReport({
      userId: userData.id,
      reportId,
      vote: 'down',
      type: 'decrement',
      isAdmin: !!userData?.isAdmin,
    });

    if (!unDownvoteReportResponse.response.ok) {
      throw new Error(unDownvoteReportResponse.json.message);
    }

    dispatch(
      userActions.deleteRatedReport({
        reportId,
      })
    );

    setReportData((prevReportData) => ({
      ...prevReportData,
      rating: {
        ...prevReportData.rating,
        voteDown: prevReportData.rating.voteDown - 1,
      },
    }));
  }, []);

  const upvoteClickHandler = async () => {
    if (!isUserLogin) {
      dispatch(uiActions.showUserNotLoginErrorModal());
      return;
    }

    try {
      if (isVoted) {
        if (vote === 'down') {
          await unDownvoteReport();
        }

        setVote('');
        setIsVoted(false);

        if (vote === 'up') {
          await unUpvoteReport();
          return;
        }
      }

      await upvoteReport();

      setVote('up');
      setIsVoted(true);
    } catch (error) {
      console.log(error);
      console.log(error.message);

      dispatch(uiActions.showVoteErrorModal());
    }
  };

  const downvoteClickHandler = async () => {
    if (!isUserLogin) {
      dispatch(uiActions.showUserNotLoginErrorModal());
      return;
    }

    try {
      if (isVoted) {
        if (vote === 'up') {
          await unUpvoteReport();
        }

        setVote('');
        setIsVoted(false);

        if (vote === 'down') {
          await unDownvoteReport();
          return;
        }
      }

      await downvoteReport();

      setVote('down');
      setIsVoted(true);
    } catch (error) {
      console.log(error);
      console.log(error.message);

      dispatch(uiActions.showVoteErrorModal());
    }
  };

  const reportInvalidReportClickHandler = async () => {
    if (!isUserLogin) {
      dispatch(uiActions.showUserNotLoginReportInvalidReportErrorModal());
      return;
    }

    dispatch(uiActions.setIsLoading(true));

    try {
      const reportInvalidReportResponse = await API.ReportInvalidReport(
        reportId
      );

      if (!reportInvalidReportResponse.response.ok) {
        throw new Error(reportInvalidReportResponse.json.message);
      }

      dispatch(uiActions.showInvalidReportAcceptedModal());
    } catch (error) {
      console.log(error);
      console.log(error.message);

      dispatch(uiActions.showInvalidReportErrorModal());
    }

    dispatch(uiActions.setIsLoading(false));
  };

  const imgLoadHandler = () => {
    setIsImageLoaded(true);
  };

  return (
    <XyzTransition appearVisible className='item-group' xyz='fade left-100%'>
      <div className='absolute top-0 left-0 sm:static w-screen h-screen sm:w-[600px] sm:h-auto z-[99999] sm:z-auto'>
        <div className='w-screen sm:w-[600px] h-full p-8 bg-primaryGradient flex flex-col gap-y-8 relative overflow-y-auto'>
          {/* Sidebar Loading Screen */}
          {isLoading && <SidebarLoadingScreen />}

          <div className='flex flex-row justify-between items-center gap-x-8'>
            <Link to='/'>
              <Logo className='w-full max-w-[150px] sm:max-w-[250px] h-fit' />
            </Link>

            {/* Close Button */}
            <Link
              to='/'
              className='bg-[#FF5454] p-3 rounded-lg transition-all hover:-translate-y-1 active:translate-y-0'
            >
              <CloseCrossIcon className='w-full aspect-square' />
            </Link>
          </div>

          {!isLoading && (
            <section className='w-full'>
              <div className='text-white mb-2'>
                <h1
                  className='font-bold text-3xl'
                  title='Jalan Berlubang di Dekat UPI Cibiru'
                >
                  {reportData.title}
                </h1>

                <h2 className='text-xl'>
                  Uploaded on{' '}
                  {new Date(reportData.createdDate).toLocaleDateString(
                    'en-US',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }
                  )}
                </h2>
              </div>

              <div className='flex flex-col gap-y-5 mb-7'>
                <div
                  className={`report-img rounded-lg overflow-hidden ${
                    !isImageLoaded
                      ? 'w-full bg-[#D7D7D7] animate-pulse min-h-[300px]'
                      : ''
                  }`}
                >
                  <img
                    src={reportData.image.url}
                    alt='Jalan Berlubang di Dekat UPI Cibiru'
                    onLoad={imgLoadHandler}
                    className='w-full object-cover object-center'
                  />
                </div>

                {/* <div className='p-4 bg-white rounded-lg text-primary'>
                <h3 className='font-bold text-xl mb-2'>Lokasi</h3>

                <p className='text-xl'>
                  3P5F+7MF, Jl. Cibiru Indah I, Cibiru Wetan, Kec. Cileunyi,
                  Kabupaten Bandung, Jawa Barat 40625
                </p>
              </div> */}

                <div className='p-4 bg-white rounded-lg text-primary'>
                  <h3 className='font-bold text-xl mb-2'>Deskripsi</h3>

                  <p className='text-xl'>{reportData.description}</p>
                </div>
              </div>

              <div className='flex flex-row justify-between items-center gap-y-4'>
                <div className='flex flex-row items-center gap-x-4'>
                  <div className='w-[70px] aspect-square rounded-full overflow-hidden border-2 border-solid border-secondary'>
                    <img
                      src={DefaultAvatar}
                      alt={`${reportData.uploaderName}'s Avatar`}
                    />
                  </div>

                  <h3 className='font-bold text-2xl text-white'>
                    {reportData.uploaderName}
                  </h3>
                </div>

                <div className='flex flex-row items-center gap-x-4'>
                  <div className='flex flex-col items-center gap-y-2'>
                    <button
                      onClick={upvoteClickHandler}
                      title='Jempol bila anda merasa masalah masih terjadi.'
                      className='upvote-button group'
                    >
                      {(!isVoted || vote !== 'up') && (
                        <ThumbsUpOutlineIcon className='w-auto transition-all group-hover:-translate-y-1 group-active:translate-y-0' />
                      )}

                      {isVoted && vote === 'up' && (
                        <ThumbsUpFilledIcon className='w-auto transition-all group-hover:-translate-y-1 group-active:translate-y-0' />
                      )}
                    </button>

                    <span className='text-white text-xl'>
                      {reportData.rating.voteUp}
                    </span>
                  </div>

                  <div className='flex flex-col items-center gap-y-2'>
                    <button
                      onClick={downvoteClickHandler}
                      title='Jempol bila anda merasa masalah telah selesai.'
                      className='downvote-button group'
                    >
                      {(!isVoted || vote !== 'down') && (
                        <ThumbsDownOutlineIcon className='w-auto transition-all group-hover:-translate-y-1 group-active:translate-y-0' />
                      )}

                      {isVoted && vote === 'down' && (
                        <ThumbsDownFilledIcon className='w-auto transition-all group-hover:-translate-y-1 group-active:translate-y-0' />
                      )}
                    </button>

                    <span className='text-white text-xl'>
                      {reportData.rating.voteDown}
                    </span>
                  </div>
                </div>

                <div>
                  <div className='group relative'>
                    <ReportIcon className='w-auto transition-all group-hover:scale-125' />

                    <div className='hidden absolute top-1/2 -translate-y-1/2 right-full w-[200px] p-2 mr-5 bg-black text-white group-hover:block'>
                      <span>
                        Laporan tidak valid?{' '}
                        <button
                          onClick={reportInvalidReportClickHandler}
                          className='relative transition-all rounded-lg px-1  hover:bg-[#FF0000]'
                        >
                          <u>Laporkan pada kami!</u>
                        </button>
                      </span>

                      <div className='absolute top-1/2 left-full -translate-y-1/2 w-fit aspect-square border-[12px] border-solid border-black border-r-transparent border-t-transparent border-b-transparent'></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </XyzTransition>
  );
};

export default ViewReportSidebar;
