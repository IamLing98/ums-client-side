import React from "react";
import { connect } from "react-redux";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
// import store from "../common/Store";
// import { ADD_MESSAGE } from "../reducer/MessageReducer";
// import Button from "@material-ui/core/Button/Button";
// import { CHANGE_CURRENT_CHAT, UPDATE_LAST_MESSAGE } from "../reducer/ChatReducer";
// import history from "../common/History";
// import { decryptMessage } from "../security/cipher/MessageCipher";

class WebSocketContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleMessageNotify = this.handleMessageNotify.bind(this);
    this.initWebSocket();
  }

  static client = new Client();

  initWebSocket() {
    let token = localStorage.getItem("token");
    WebSocketContainer.client.webSocketFactory = () =>
      new SockJS(
        `http://localhost:8080/socket?access_token=${token}`,
      );
    WebSocketContainer.client.onConnect = () => {
      WebSocketContainer.client.subscribe("/topic/notifications", (response) => {
        // let data;
        // try {
        //   data = JSON.parse(response.body);
        // } catch (e) {
        //   console.log(e);
        // }
        this.handleMessageNotify(response.body);
      });
    };
  }

  handleMessageNotify(message) {
    // if (message.chatId !== this.props.currentChat || !this.props.isChatPage) {
    // this.props.enqueueSnackbar(decryptMessage(message.text), {
    //   variant: "info",
    //   autoHideDuration: 3000,
    //   anchorOrigin: {
    //     vertical: "bottom",
    //     horizontal: "right",
    //   },
    //   action: <button size="small">Open</button>,
    // });
    // } else {
    // store.dispatch({
    //   type: ADD_MESSAGE,
    //   message: message,
    // });
    // }
    // store.dispatch({
    //   type: UPDATE_LAST_MESSAGE,
    //   chat: { id: message.chatId, lastMessage: message },
    // });
    console.log(message);
  }

  componentDidMount() {
    WebSocketContainer.client.activate();
  }

  componentWillUnmount() {
    WebSocketContainer.client.deactivate();
  }

  render() {
    return null;
  }
}

const mapStateToProps = (store) => {
  return {
    // currentChat: store.chatState.currentChat,
  };
};

export const sendWebSocketMessage = (message) => {
  WebSocketContainer.client.publish({
    destination: "/chat/message",
    body: JSON.stringify(message),
  });
  message.created = new Date();
  // store.dispatch({
  //   type: ADD_MESSAGE,
  //   message: message,
  // });
};

export default connect(mapStateToProps)(WebSocketContainer);
