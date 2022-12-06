import Leaflet from 'leaflet';
import ElectricityDamageMarker from '../../assets/SVG/electricity-damage-marker.svg';

const electricityDamageMarker = Leaflet.icon({
  iconUrl: ElectricityDamageMarker,
  iconSize: [38, 95],
  iconAnchor: [18.5, 82],
  popupAnchor: [-3, -76],
});

export default electricityDamageMarker;
