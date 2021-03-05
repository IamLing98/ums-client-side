import axios from "../../index";
import { SUCCESS, FAILURE, REQUEST } from "../actionTypeUlti";

export const authActionType = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  GET_USER_DETAIL: "GET_USER_DETAIL",
  GET_STUDENT_DETAIL: "GET_STUDENT_DETAIL",
  GET_TEACHER_DETAIL: "GET_TEACHER_DETAIL",
};

export const ROLE = {
  STUDENT: "STUDENT_ROLE",
  TEACHER: "TEACHER_ROLE",
};
let token = localStorage.getItem("token");

export const login = (values) => {
  return (dispatch) => {
    axios
      .post("/authenticate", values)
      .then((response) => {
        let data = response.data;
        dispatch(loginSuccess(data));
      })
      .catch((err) => dispatch({ type: FAILURE(authActionType.LOGIN) }));
    return { type: REQUEST(authActionType.LOGIN) };
  };
};

const loginSuccess = (values) => {
  console.log("login success:", values);
  return {
    type: SUCCESS(authActionType.LOGIN),
    payload: { token: values.token, username: values.user.username, role: values.user.roleDTO.roleId },
  };
};

export const logout = () => {
  return {
    type: authActionType.LOGOUT,
  };
};

export const getUserDetail = () => {
  console.log("getUserDetail");
  let username = localStorage.getItem("username");
  let role = localStorage.getItem("role");
  console.log("username:", username);
  console.log(role);
  return (dispatch) => {
    if (role === "2") {
      dispatch(getStudentDetail(username));
    } else if (role === "3") {
      dispatch(getTeacherDetail(username));
    }
    return { type: authActionType.GET_USER_DETAIL };
  };
};

export const getStudentDetail = (ownerId) => {
  return (dispatch) => {
    axios
      .get(`/students/${ownerId}`)
      .then((response) => {
        dispatch(getStudentDetailSuccess(response.data));
      })
      .catch((err) => dispatch(getStudentDetailFailed()));
  };
};

const getStudentDetailSuccess = (values) => {
  return {
    type: SUCCESS(authActionType.GET_STUDENT_DETAIL),
    payload: values,
  };
};

const getStudentDetailFailed = () => {
  return {
    type: FAILURE(authActionType.GET_STUDENT_DETAIL),
  };
};

export const getTeacherDetail = (teacherId) => {
  return (dispatch) => {
    axios
      .get(`/employee/${teacherId}`)
      .then((response) => {
        dispatch({ type: SUCCESS(authActionType.GET_TEACHER_DETAIL), payload: response.data });
      })
      .catch((err) => dispatch({ type: FAILURE(authActionType.GET_TEACHER_DETAIL) }));
  };
};

const authState = {
  isLogin: token ? true : false,
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
      console.log("login success, payload:", action.payload);
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("username", action.payload.username);
      localStorage.setItem("role", action.payload.role);
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
    case authActionType.GET_USER_DETAIL:
      return {
        ...state,
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
        isLogin: false,
      };
    case REQUEST(authActionType.GET_TEACHER_DETAIL):
      return {
        ...state,
      };
    case SUCCESS(authActionType.GET_TEACHER_DETAIL):
      return {
        ...state,
        isLogin: true,
        user: action.payload,
        role: ROLE.TEACHER,
      };
    case FAILURE(authActionType.GET_TEACHER_DETAIL):
      return {
        ...state,
        isLogin: false,
      };
    default:
      return state;
  }
};
