import { configureStore } from '@reduxjs/toolkit';

import { userReducer } from './slice/user-slice';
import { locationReducer } from './slice/location-slice';
import { uiReducer } from './slice/ui-slice';
import { reportsReducer } from './slice/reports-slice';

const store = configureStore({
  reducer: {
    user: userReducer,
    reports: reportsReducer,
    location: locationReducer,
    ui: uiReducer,
  },
});

export { store };
