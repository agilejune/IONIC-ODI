import { combineReducers } from './combineReducers';

export const initialState: AppState = {

};

export const reducers = combineReducers({

});

export type AppState = ReturnType<typeof reducers>;