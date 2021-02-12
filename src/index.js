import React from "react";
import ReactDOM from "react-dom";
import "./assets/scss/style.scss";
import "antd/dist/antd.css";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1MTcxMDAwMzIiLCJleHAiOjE2MTQ5NDQ2MzQsImlhdCI6MTYxMzE0NDYzNH0.9j0sJYLQRsXF18U4vYNUlR73kC1AFPWNqtI7PIUS6vWZSlOebww2iILB8ACu28EIxS7CBL4nDjVoAqXFZWzvmA";
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
