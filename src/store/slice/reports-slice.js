import { createSlice } from '@reduxjs/toolkit';

const reportsInitialState = {
  /*
    reports: {
      'report-1': {
        userId: 'user-1',
        uploaderName: 'John Doe',
        type: 'road-damage',
        coordinate: {
          lat: -6.939952832600759,
          lng: 107.72534072399141,
        },
        title: 'Jalan Bolong',
        description: 'Jalanan disini bolong-bolong',
        image:
          {
            url: 'https://as2.ftcdn.net/v2/jpg/04/52/30/23/1000_F_452302343_YFc880XmkLUAgiwd1XV5XQmPKFSp580b.jpg',
            delete_url: ''
          },
        createdDate: new Date(2022, 11, 23).toISOString(),
        rating: [
          {
            userId: 'user-2',
            vote: 'up',
          },
        ],
      },
    }
  */

  reports: [],
};

const reportsSlice = createSlice({
  name: 'reports',
  initialState: reportsInitialState,
  reducers: {
    setReports(state, action) {
      /*
        action: {
          payload: {} // -> reports object
        }
      */

      state.reports = action.payload;
    },

    deleteReport(state, action) {
      // action.payload = reportId

      state.reports = state.reports.filter(
        (report) => report.id !== action.payload
      );
    },
  },
});

const reportsActions = reportsSlice.actions;
const reportsReducer = reportsSlice.reducer;

// Action Creator Thunk
// const fetchReports = (reports = {}) => {
//   return async (dispatch) => {
//     dispatch(reportsActions.setReports(reports));
//   };
// };

export { reportsActions, reportsReducer };
