import { createSlice } from '@reduxjs/toolkit';

const locationInitialState = {
  /*
   markers: [
    {
      caption: '',
      coordinate: [lat, lng],
    }
   ]
  */
  markers: [],

  upiCibiru: [-6.939952832600759, 107.72534072399141],

  user: [], // -> [lat, lng]
};

const locationSlice = createSlice({
  name: 'location',
  initialState: locationInitialState,
  reducers: {
    addMarker(state, action) {
      /*
        action: {
          payload: {         
            caption: '',
            lat: lat,
            lng: lng,
          }
        }
      */

      state.markers.push({
        caption: action.payload.caption,
        coordinate: [action.payload.lat, action.payload.lng],
      });
    },

    setUserLocation(state, actions) {
      /*
        action: {
          payload: {         
            lat: lat,
            lng: lng,
          }
        }
      */

      state.user = [actions.payload.lat, actions.payload.lng];
    },

    removeUserLocation(state) {
      state.user = [];
    },
  },
});

const locationActions = locationSlice.actions;
const locationReducer = locationSlice.reducer;

export { locationActions, locationReducer };
