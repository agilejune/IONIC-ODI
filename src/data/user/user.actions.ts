import { setIsLoggedInData,  setUserData as setUserDataStorage} from '../storage';
import { ActionType } from '../../util/types';
import { User } from '../../models/User';

export const setLoading = (isLoading: boolean) => ({
  type: 'set-user-loading',
  isLoading
} as const);

export const setUserData = (data: User) => {
  setUserDataStorage(data);
  return ({
    type: 'set-user-data',
    data
  } as const);
};

export const setIsLoggedIn = (loggedIn: boolean) => async (dispatch: React.Dispatch<any>) => {
  await setIsLoggedInData(loggedIn);
  return ({
    type: 'set-is-loggedin',
    loggedIn
  } as const)
};

export const setUsername = (user_name?: string) => async (dispatch: React.Dispatch<any>) => {
  return ({
    type: 'set-username',
    user_name
  } as const);
};

export const logoutUser = () => async (dispatch: React.Dispatch<any>) => {
  await setIsLoggedInData(false);
  dispatch(setUsername());
};

export type UserActions =
  | ActionType<typeof setLoading>
  | ActionType<typeof setUserData>
  | ActionType<typeof setIsLoggedIn>
  | ActionType<typeof setUsername>
