import { useDispatch } from 'react-redux';
import { useMapEvents } from 'react-leaflet';

import { locationActions } from '../../../store/slice/location-slice';

const MapEvents = () => {
  const dispatch = useDispatch();

  const map = useMapEvents({
    click: (e) => {
      console.log('map clicked:');
      console.log(e);

      dispatch(
        locationActions.addMarker({
          caption: `Location with lat: ${e.latlng.lat} and lng: ${e.latlng.lng}`,
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        })
      );
    },
  });

  return null;
};

export default MapEvents;
