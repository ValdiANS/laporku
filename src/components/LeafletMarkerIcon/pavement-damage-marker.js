import Leaflet from 'leaflet';
import PavementDamageMarker from '../../assets/SVG/pavement-damage-marker.svg';

const pavementDamageMarker = Leaflet.icon({
  iconUrl: PavementDamageMarker,
  iconSize: [38, 95],
  iconAnchor: [18.5, 82],
  popupAnchor: [-3, -76],
});

export default pavementDamageMarker;
