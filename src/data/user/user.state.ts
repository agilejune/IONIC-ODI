import { User } from "../../models/User";

export interface UserState {
  isLoggedin: boolean;
  loading: boolean;
  user_name: string,
  userData: User
};