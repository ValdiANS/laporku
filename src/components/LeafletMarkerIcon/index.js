import fireMarker from './fire-marker';
import roadDamageMarker from './road-damage-marker';
import pavementDamageMarker from './pavement-damage-marker';
import electricityDamageMarker from './electricity-damage-marker';
import environmentDamageMarker from './environment-damage-marker';
import publicFacilityDamageMarker from './public-facility-damage-marker';
import transportationFacilityDamageMarker from './transportation-facility-damage-marker';
import waterDamageMarker from './water-damage-marker';

const markerIcons = {
  fire: fireMarker,
  'road-damage': roadDamageMarker,
  'pavement-damage': pavementDamageMarker,
  'electricity-damage': electricityDamageMarker,
  'environment-damage': environmentDamageMarker,
  'public-facility-damage': publicFacilityDamageMarker,
  'transportation-facility-damage': transportationFacilityDamageMarker,
  'water-damage': waterDamageMarker,
};

export default markerIcons;
