import { Link } from 'react-router-dom';

import DeleteReportIcon from '../../../../components/SVG/DeleteReportIcon';

const InvalidReportCard = ({
  title = '',
  userName = '',
  reportId = '',
  deleteClickHandler = (reportId = '') => {},
}) => (
  <div className='invalid-report-card w-full px-4 py-6 bg-white rounded-lg flex flex-col justify-between gap-y-4'>
    <div className='w-full text-primary'>
      <h3
        title={title}
        className='w-full font-bold text-xl text-ellipsis overflow-hidden mb-1'
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 1,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {title}
      </h3>

      <h4 className='text-xl'>{userName}</h4>
    </div>

    <div className='self-end flex flex-row items-center gap-x-4'>
      <Link
        to={`/view/${reportId}`}
        className='px-4 py-2 bg-primary rounded-lg font-bold text-white transition-all hover:brightness-105 active:brightness-100 hover:-translate-y-1 active:translate-y-0'
      >
        Lihat
      </Link>

      <button
        onClick={deleteClickHandler}
        className='transition-all hover:brightness-105 active:brightness-100 hover:-translate-y-1 active:translate-y-0'
      >
        <DeleteReportIcon className='w-[47px]' />
      </button>
    </div>
  </div>
);

export default InvalidReportCard;
