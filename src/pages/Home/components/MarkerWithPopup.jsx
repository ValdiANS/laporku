import { Link } from 'react-router-dom';
import { Marker, Popup, useMap } from 'react-leaflet';

const MarkerWithPopup = ({
  reportKey = '',
  position = [],
  icon,
  title = '',
}) => {
  const map = useMap();

  const markerEventsHandler = {
    click: () => {
      map.setView(position, 18);
    },
  };

  return (
    <Marker position={position} icon={icon} eventHandlers={markerEventsHandler}>
      <Popup>
        <div className='flex flex-col items-center gap-y-4'>
          <p className='font-poppins font-bold'>{title}</p>

          <Link
            to={`/view/${reportKey}`}
            className='px-4 py-2 rounded-lg bg-primary font-poppins font-bold text-center transition-all hover:-translate-y-1 active:translate-y-0 hover:brightness-110 active:brightness-100'
            style={{
              color: '#ffffff ',
            }}
          >
            Lihat Laporan
          </Link>
        </div>
      </Popup>
    </Marker>
  );
};

export default MarkerWithPopup;
