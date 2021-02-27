import axios from "axios";
export const notificationActionsType = {
  GET_LIST_NOTIFICATIONS: "GET_LIST_NOTIFICATIONS",
};

export const getListNotifications = () => {
  return {
    type: notificationActionsType.GET_LIST_NOTIFICATIONS,
    payload: axios
      .get("/notifications")
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err)),
  };
};
