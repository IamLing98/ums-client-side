// import axios from "axios";

// const API_ROOT = "http://127.0.0.1:8080";

// const responseBody = (res) => res.data;

// let token = localStorage.getItem("token");

// if (token) {
//   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// }
// // const tokenPlugin = (secured) => {
// //   var config = {
// //     headers: {
// //       "Content-Type": "application/json",
// //     },
// //   };
// //   // if (token && secured) {
// //     if (token && secured) {
// //     config.headers.Authorization = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2YW5kb2FuNTQ3IiwiZXhwIjoxNjEwMjc5NjMwLCJpYXQiOjE2MDg0Nzk2MzB9.d1x1aqSBHtSx3eiI-dFARUFSYNWo7b_t2T14jOv4ZOYDRYuZj1ujR0sZ5KbAL32F7gvxgVUOPQgHLM2icQKnxQ`;
// //   }
// //   return config;
// // };

// export const api = {
//   get: (url, secured = true) => {
//     return axios.get(`${API_ROOT}${url}`).then(responseBody);
//   },
//   post: (url, body = null, secured = true) => {
//     return axios.post(`${API_ROOT}${url}`, body).then(responseBody);
//   },
//   put: (url, body = null, secured = true) => {
//     return axios.put(`${API_ROOT}${url}`, body).then(responseBody);
//   },
//   upload: (url, file, secured = true) => {
//     return axios.post(`${API_ROOT}${url}`).attach("file", file).then(responseBody);
//   },
//   delete: (url, secured = true) => {
//     return axios.delete(`${API_ROOT}${url}`).then(responseBody);
//   },
//   // setToken: (newToken) => (token = newToken),
// };

// export default api;
