import Leaflet from 'leaflet';
import RoadDamageMarker from '../../assets/SVG/road-damage-marker.svg';

const roadDamageMarker = Leaflet.icon({
  iconUrl: RoadDamageMarker,
  iconSize: [38, 95],
  iconAnchor: [18.5, 82],
  popupAnchor: [-3, -76],
});

export default roadDamageMarker;
