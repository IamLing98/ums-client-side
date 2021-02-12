import React from "react";
import ReactDOM from "react-dom";
import "./assets/scss/style.scss";
import "antd/dist/antd.css";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2YW5kb2FuNTQ3IiwiZXhwIjoxNjA1MDM0ODY1LCJpYXQiOjE2MDMyMzQ4NjV9.ISjUwohisU4GYq-141rBxa2XNvI-r3DkTOxe4PiPfNSl3qdi86i_cYoq4FxFurvWWuw18IA3cAIHEFcc4yCjmA";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.interceptors.request.use(
  (request) => {
    // console.log(request);
    // Edit request config
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
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
  }
);
const App = require("./app").default;

ReactDOM.render(<App />, document.getElementById("root"));
