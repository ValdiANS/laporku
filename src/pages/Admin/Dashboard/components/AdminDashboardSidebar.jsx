import { Link } from 'react-router-dom';

import { XyzTransition, XyzTransitionGroup } from '@animxyz/react';

import SidebarLoadingScreen from '../../../../components/SidebarLoadingScreen';
import InvalidReportCard from './InvalidReportCard';

import Logo from '../../../../components/SVG/Logo';
import CloseCrossIcon from '../../../../components/SVG/CloseCrossIcon';

const AdminDashboardSidebar = ({ show = false, onClose = () => {} }) => {
  const deleteInvalidReportHandler = (reportId = '') => {
    // delete invalid report with reportId
  };

  return (
    <XyzTransition appearVisible className='item-group' xyz='fade left-100%'>
      {show && (
        <div className='absolute top-0 left-0 sm:static w-screen h-screen sm:w-[600px] sm:h-auto z-[99999] sm:z-auto'>
          <div className='relative w-screen sm:w-[600px] h-screen p-8 bg-primaryGradient overflow-y-auto flex flex-col gap-y-8'>
            {/* Sidebar Loading Screen */}
            {/* <SidebarLoadingScreen /> */}

            <div className='flex flex-row justify-between items-center'>
              <Link to='/'>
                <Logo className='w-full max-w-[150px] sm:max-w-[250px] h-fit' />
              </Link>

              {/* Close Button */}
              <button
                onClick={onClose}
                className='h-fit bg-[#FF5454] p-3 rounded-lg transition-all hover:-translate-y-1 active:translate-y-0'
              >
                <CloseCrossIcon className='w-full aspect-square' />
              </button>
            </div>

            <div>
              <h1 className='font-bold text-3xl text-white text-center mb-8'>
                Laporan Tidak Valid
              </h1>

              <XyzTransitionGroup
                appearVisible
                xyz='fade left-100% stagger-0.5'
                className='list-invalid-reports flex flex-col gap-y-4'
              >
                {new Array(10).fill('').map((item, idx) => (
                  <div key={idx}>
                    <InvalidReportCard
                      title='Jalan Berlubang di Dekat UPI Cibiru'
                      userName='user123'
                      reportId={`test${idx + 1}`}
                      deleteClickHandler={deleteInvalidReportHandler.bind(
                        null,
                        `test${idx + 1}`
                      )}
                    />
                  </div>
                ))}
              </XyzTransitionGroup>
            </div>
          </div>
        </div>
      )}
    </XyzTransition>
  );
};

export default AdminDashboardSidebar;
