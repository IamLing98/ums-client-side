import axios from "axios";
import { SUCCESS, FAILURE, REQUEST } from "../actionTypeUlti";

export const authActionType = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  GET_STUDENT_DETAIL: "GET_STUDENT_DETAIL",
  GET_TEACHER_DETAIL: "GET_TEACHER_DETAIL",
};

export const ROLE = {
  STUDENT: "STUDENT_ROLE",
  TEACHER: "TEACHER_ROLE",
};
let user = localStorage.getItem("token");

export const login = (values) => {
  return {
    type: authActionType.LOGIN,
    payload: axios
      .post("/authenticate", values)
      .then((response) => {
        return response.data;
      })
      .catch((err) => console.log(err)),
  };
};

export const logout = () => {
  return {
    type: authActionType.LOGOUT,
  };
};

export const getStudentDetail = (studentId) => {
  return {
    type: authActionType.GET_STUDENT_DETAIL,
    payload: axios
      .get(`/students/${studentId}`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => console.log(err)),
  };
};

export const getTeacherDetail = (teacherId) => {
  return {
    type: authActionType.GET_TEACHER_DETAIL,
    payload: axios
      .get(`/students/${teacherId}`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => console.log(err)),
  };
};

const authState = {
  isLogin: user ? true : false,
  user: null,
  role: null,
};

export default (state = authState, action) => {
  switch (action.type) {
    case REQUEST(authActionType.LOGIN):
      return {
        ...state,
      };
    case SUCCESS(authActionType.LOGIN):
      localStorage.setItem("token", action.payload.jwttoken);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        isLogin: true,
      };
    case FAILURE(authActionType.LOGIN):
      return {
        ...state,
      };
    case authActionType.LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        ...state,
        isLogin: false,
        user: null,
      };
    case REQUEST(authActionType.GET_STUDENT_DETAIL):
      return {
        ...state,
      };
    case SUCCESS(authActionType.GET_STUDENT_DETAIL):
      return {
        ...state,
        user: action.payload,
        role: ROLE.STUDENT,
      };
    case FAILURE(authActionType.GET_STUDENT_DETAIL):
      return {
        ...state,
      };
    default:
      return state;
  }
};
