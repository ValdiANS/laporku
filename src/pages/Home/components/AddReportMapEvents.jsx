import { useDispatch } from 'react-redux';
import { useMapEvents } from 'react-leaflet';

import { locationActions } from '../../../store/slice/location-slice';
import { uiActions } from '../../../store/slice/ui-slice';

const AddReportMapEvents = ({ onSelectLocation = (lat, lng) => {} }) => {
  const dispatch = useDispatch();

  const map = useMapEvents({
    click: (e) => {
      // console.log('map clicked:');
      // console.log(e);

      dispatch(uiActions.hideInfoModal());
      onSelectLocation(e.latlng.lat, e.latlng.lng);

      if (window.screen.availWidth > 640) {
        map.setView([e.latlng.lat, e.latlng.lng + 0.0015], 18);
      } else {
        map.setView([e.latlng.lat, e.latlng.lng], 18);
      }
    },
  });

  return null;
};

export default AddReportMapEvents;
