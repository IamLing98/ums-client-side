import { combineReducers } from "redux";
import settings from "./settings/reducer"; 
import notificationReducer from "./notifications/notificationsReducer";
import authReducer from "./auth/reducer";

const reducers = combineReducers({
  settings, 
  notificationReducer,
  authReducer: authReducer,
});
export default reducers;
