import { useState } from 'react';
import { Link } from 'react-router-dom';

import { XyzTransition } from '@animxyz/react';

import SidebarLoadingScreen from '../../../components/SidebarLoadingScreen';

import Logo from '../../../components/SVG/Logo';
import CloseCrossIcon from '../../../components/SVG/CloseCrossIcon';
import ThumbsUpOutlineIcon from '../../../components/SVG/ThumbsUpOutlineIcon';
import ThumbsUpFilledIcon from '../../../components/SVG/ThumbsUpFilledIcon';
import ThumbsDownOutlineIcon from '../../../components/SVG/ThumbsDownOutlineIcon';
import ThumbsDownFilledIcon from '../../../components/SVG/ThumbsDownFilledIcon';
import ReportIcon from '../../../components/SVG/ReportIcon';

import DefaultAvatar from '../../../assets/image/default-avatar.png';
import RoadDamageExample from '../../../assets/image/road-damage-example.png';

const ViewReportSidebar = () => {
  const [isVoted, setIsVoted] = useState(false);
  const [vote, setVote] = useState(''); // -> 'up' or 'down'

  const upvoteClickHandler = () => {
    if (isVoted) {
      setVote('');
      setIsVoted(false);

      return;
    }

    setVote('up');
    setIsVoted(true);
  };

  const downvoteClickHandler = () => {
    if (isVoted) {
      setVote('');
      setIsVoted(false);

      return;
    }

    setVote('down');
    setIsVoted(true);
  };

  return (
    <XyzTransition appearVisible className='item-group' xyz='fade left-100%'>
      <div className='absolute top-0 left-0 sm:static w-screen h-screen sm:w-[600px] sm:h-auto z-[99999] sm:z-auto'>
        <div className='w-screen sm:w-[600px] h-full p-8 bg-primaryGradient flex flex-col gap-y-8 relative overflow-y-auto'>
          {/* Sidebar Loading Screen */}
          {/* <SidebarLoadingScreen /> */}

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

          <section className='w-full'>
            <div className='text-white mb-2'>
              <h1
                className='font-bold text-3xl'
                title='Jalan Berlubang di Dekat UPI Cibiru'
              >
                Jalan Berlubang di Dekat UPI Cibiru
              </h1>

              <h2 className='text-xl'>Uploaded on 11th September 2020</h2>
            </div>

            <div className='flex flex-col gap-y-5 mb-7'>
              <div className='report-img rounded-lg overflow-hidden'>
                <img
                  src={RoadDamageExample}
                  alt='Jalan Berlubang di Dekat UPI Cibiru'
                  className='w-full object-cover object-center'
                />
              </div>

              <div className='p-4 bg-white rounded-lg text-primary'>
                <h3 className='font-bold text-xl mb-2'>Lokasi</h3>

                <p className='text-xl'>
                  3P5F+7MF, Jl. Cibiru Indah I, Cibiru Wetan, Kec. Cileunyi,
                  Kabupaten Bandung, Jawa Barat 40625
                </p>
              </div>

              <div className='p-4 bg-white rounded-lg text-primary'>
                <h3 className='font-bold text-xl mb-2'>Deskripsi</h3>

                <p className='text-xl'>
                  Jalanan bolong di sekitar Kampus UPI Cibiru, lebih tepatnya di
                  depan Laboratorium UPI. Lubang cukup dalam dan sering
                  menyebabkan korban saat banjir.
                  <br />
                  <br />
                  <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Fugit reiciendis soluta, totam nostrum sit ipsam quaerat
                    sint itaque minima asperiores unde eos adipisci id quas
                    deleniti aut sed doloremque consectetur. Nobis facere
                    sapiente aliquam. Impedit repellat iure natus dolor
                    repellendus? Accusantium, eveniet? Debitis, nihil! Non nemo
                    ut necessitatibus optio ratione?
                  </span>
                </p>
              </div>
            </div>

            <div className='flex flex-row justify-between items-center gap-y-4'>
              <div className='flex flex-row items-center gap-x-4'>
                <div className='w-[70px] aspect-square rounded-full overflow-hidden border-2 border-solid border-secondary'>
                  <img src={DefaultAvatar} alt="User's Avatar" />
                </div>

                <h3 className='font-bold text-2xl text-white'>User123</h3>
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

                  <span className='text-white text-xl'>12</span>
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

                  <span className='text-white text-xl'>0</span>
                </div>
              </div>

              <div>
                <button className='group relative'>
                  <ReportIcon className='w-auto transition-all group-hover:scale-125' />

                  <div className='hidden absolute top-1/2 -translate-y-1/2 right-full w-[200px] p-2 mr-5 bg-black text-white group-hover:block'>
                    <span>
                      Laporan tidak valid? <u>Beri tahu kami!</u>
                    </span>

                    <div className='absolute top-1/2 left-full -translate-y-1/2 w-fit aspect-square border-[12px] border-solid border-black border-r-transparent border-t-transparent border-b-transparent'></div>
                  </div>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </XyzTransition>
  );
};

export default ViewReportSidebar;
