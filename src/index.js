import React from "react";
import ReactDOM from "react-dom";
import "./assets/scss/style.scss";
import "antd/dist/antd.css";
import axios from "axios";

let jwtToken = localStorage.hasOwnProperty("token");

if (jwtToken) {
  console.log(localStorage.getItem("token"));
  axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
}
axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization) {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);
axios.interceptors.request.use(
  (request) => {
    // console.log(request);
    // Edit request config
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
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

const App = require("./app").default;

ReactDOM.render(<App />, document.getElementById("root"));
