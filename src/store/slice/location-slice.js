import { createSlice } from '@reduxjs/toolkit';

const locationInitialState = {
  upiCibiru: [-6.939952832600759, 107.72534072399141],
  bandung: [-6.920292, 107.618637],

  user: [], // -> [lat, lng]

  centerOfTheMap: [-6.920292, 107.618637], // -> [lat, lng]

  selectedLocation: [],
};

const locationSlice = createSlice({
  name: 'location',
  initialState: locationInitialState,
  reducers: {
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

    setSelectedLocation(state, action) {
      state.selectedLocation = action.payload;
    },
  },
});

const locationActions = locationSlice.actions;
const locationReducer = locationSlice.reducer;

export { locationActions, locationReducer };
