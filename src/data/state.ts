import { combineReducers } from './combineReducers';
import { deliveryReducer } from './delivery/delivery.reducer';
import { userReducer } from './user/user.reducer';

export const initialState: AppState = {
  user: {
    isLoggedin: false,
    loading: false,
    user_name: "",
  },
  delivery: {
    ongoingDeliverys: [],
    pastDeliverys: [],
    orders: [],
    feedbacks: [],
    transLossAll: [],
    checkLists: [],
    tanks: [],
    justify: [],
    dataLoading: false,
    dataSending: false,
    willSendCount: 0,
    transFormOfflineDatas: [],
    drivers: [],
    vehicles: [],
    message: "",
    responseStatus: ""
  },
};

export const reducers = combineReducers({
  user:     userReducer,
  delivery: deliveryReducer,
});

export type AppState = ReturnType<typeof reducers>;