import { configureStore } from '@reduxjs/toolkit';

import { userReducer } from './slice/user-slice';
import { locationReducer } from './slice/location-slice';
import { uiReducer } from './slice/ui-slice';

const store = configureStore({
  reducer: {
    user: userReducer,
    location: locationReducer,
    ui: uiReducer,
  },
});

export { store };
