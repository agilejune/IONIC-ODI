import { combineReducers } from './combineReducers';
import { dataReducer } from './data/data.reducer';
import { userReducer } from './user/user.reducer';

export const initialState: AppState = {
  user: {
    isLoggedin: false,
    loading: false,
    user_name: "",
  },
  data: {
    ongoingDeliverys: [],
    pastDeliverys: [],
    orders: [],
    feedbacks: [],
    transLossAll: [],
    checkLists: [],
    tanks: [],
    justify: [],
    dataLoading: false,
    willSendCount: 0,
    transFormOfflineDatas: [],
    drivers: [],
    vehicles: [],
    message: "",
    responseStatus: ""
  },
};

export const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
});

export type AppState = ReturnType<typeof reducers>;