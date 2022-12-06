import Leaflet from 'leaflet';
import FireMarker from '../../assets/SVG/fire-marker.svg';

const fireMarker = Leaflet.icon({
  iconUrl: FireMarker,
  iconSize: [38, 95],
  iconAnchor: [18.5, 82],
  popupAnchor: [-3, -76],
});

export default fireMarker;
