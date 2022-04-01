import { combineReducers } from './combineReducers';
import { deliveryReducer } from './delivery/delivery.reducer';
import { userReducer } from './user/user.reducer';

export const initialState: AppState = {
  user: {
    isLoggedin: false,
    loading: false
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
  },
};

export const reducers = combineReducers({
  user: userReducer,
  delivery: deliveryReducer,
});

export type AppState = ReturnType<typeof reducers>;