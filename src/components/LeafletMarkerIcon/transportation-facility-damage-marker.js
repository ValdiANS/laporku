import Leaflet from 'leaflet';
import TransportationFacilityDamageMarker from '../../assets/SVG/transportation-facility-damage-marker.svg';

const transportationFacilityDamageMarker = Leaflet.icon({
  iconUrl: TransportationFacilityDamageMarker,
  iconSize: [38, 95],
  iconAnchor: [18.5, 82],
  popupAnchor: [-3, -76],
});

export default transportationFacilityDamageMarker;
