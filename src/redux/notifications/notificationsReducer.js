import { SUCCESS, FAILURE, REQUEST } from "../actionTypeUlti";
import { notificationActionsType } from "./notificationActions";

const initState = {
  nofiticationsList: [],
  notReadNumber: 0,
};

export default (state = initState, action) => {
  switch (action.type) {
    case REQUEST(notificationActionsType.GET_LIST_NOTIFICATIONS):
      return { ...state };
    case SUCCESS(notificationActionsType.GET_LIST_NOTIFICATIONS):
      return {
        ...state,
        nofiticationsList: action.payload ? action.payload.notifications : [],
        notReadNumber: action.payload ? action.payload.notRead : 0,
      };
    case FAILURE(notificationActionsType.GET_LIST_NOTIFICATIONS):
      return { ...state };

    default:
      return { ...state };
  }
};
