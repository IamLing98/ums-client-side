import { combineReducers } from "redux";
import settings from "./settings/reducer";
import chatReducer from "./chat/reducer";
import emailReducer from "./email/";
import notificationReducer from "./notifications/notificationsReducer";
import authReducer from "./auth/reducer";

const reducers = combineReducers({
  settings,
  chatReducer,
  emailReducer,
  notificationReducer,
  authReducer: authReducer,
});
export default reducers;
