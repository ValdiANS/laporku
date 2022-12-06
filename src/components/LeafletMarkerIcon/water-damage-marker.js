import Leaflet from 'leaflet';
import WaterDamageMarker from '../../assets/SVG/water-damage-marker.svg';

const waterDamageMarker = Leaflet.icon({
  iconUrl: WaterDamageMarker,
  iconSize: [38, 95],
  iconAnchor: [18.5, 82],
  popupAnchor: [-3, -76],
});

export default waterDamageMarker;
