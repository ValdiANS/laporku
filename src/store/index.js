import { configureStore } from '@reduxjs/toolkit';

import { locationReducer } from './slice/location-slice';

const store = configureStore({
  reducer: {
    location: locationReducer,
  },
});

export { store };
