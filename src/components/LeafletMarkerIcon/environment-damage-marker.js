import Leaflet from 'leaflet';
import EnvironmentDamageMarker from '../../assets/SVG/environment-damage-marker.svg';

const environmentDamageMarker = Leaflet.icon({
  iconUrl: EnvironmentDamageMarker,
  iconSize: [38, 95],
  iconAnchor: [18.5, 82],
  popupAnchor: [-3, -76],
});

export default environmentDamageMarker;
