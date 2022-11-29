import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='w-screen h-screen grid place-items-center'>
      <div className='flex flex-col gap-y-10 items-center'>
        <h1 className='font-bold text-5xl'>404 Not Found Page</h1>

        <Link
          to='/'
          className='w-fit px-4 py-2 bg-blue-400 text-white font-medium rounded-lg'
        >
          Back to main page
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
