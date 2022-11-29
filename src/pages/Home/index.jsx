import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useSelector } from 'react-redux';

import MapEvents from './components/MapEvents';

const Home = () => {
  const upiCibiruCoordinate = useSelector((state) => state.location.upiCibiru);
  const markersLocation = useSelector((state) => state.location.markers);

  console.log(markersLocation);

  return (
    <main className='w-screen h-screen overflow-hidden'>
      <MapContainer
        center={upiCibiruCoordinate}
        zoom={17}
        scrollWheelZoom={true}
        minZoom={4}
        className='w-screen h-screen absolute top-0 left-0 z-0'
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        <Marker position={upiCibiruCoordinate}>
          <Popup>Upi Cibiru</Popup>
        </Marker>

        {/* Add Map Events */}
        <MapEvents />
      </MapContainer>
    </main>
  );
};

export default Home;
