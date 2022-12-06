import Leaflet from 'leaflet';
import PublicFacilityDamageMarker from '../../assets/SVG/public-facility-damage-marker.svg';

const publicFacilityDamageMarker = Leaflet.icon({
  iconUrl: PublicFacilityDamageMarker,
  iconSize: [38, 95],
  iconAnchor: [18.5, 82],
  popupAnchor: [-3, -76],
});

export default publicFacilityDamageMarker;
