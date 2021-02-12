import { SUCCESS, FAILURE, REQUEST } from "../actionTypeUlti";
import { notificationActionsType } from "./notificationActions";

const initState = {
  nofiticationsList: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case REQUEST(notificationActionsType.GET_LIST_NOTIFICATIONS):
      console.log("request");
      return { ...state };
    case FAILURE(notificationActionsType.GET_LIST_NOTIFICATIONS):
      return { ...state };
    case SUCCESS(notificationActionsType.GET_LIST_NOTIFICATIONS):
      return {
        ...state,
        nofiticationsList: action.payload.notifications,
      }; 

    default:
      return { ...state };
  }
};
