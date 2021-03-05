import React from "react";
import ReactDOM from "react-dom";
import "./assets/scss/style.scss";
import "antd/dist/antd.css";
import axios from "axios";

// localStorage.removeItem("token");
// localStorage.removeItem("user");

let hasToken = localStorage.hasOwnProperty("token");
if (hasToken) {
  let jwtToken = localStorage.getItem("token");
  console.log(jwtToken);
  if (localStorage.getItem("token") || localStorage.getItem("token") !== "") {
    console.log("lan 1");
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  } else {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
}

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization) {
      const token = localStorage.getItem("token");
      console.log(token !== undefined);
      if (token !== null && typeof token !== "undefined") {
        console.log("lan 2");
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response) => {
    // console.log(response);
    // Edit response config
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

export default axios;

const App = require("./app").default;

ReactDOM.render(<App />, document.getElementById("root"));
