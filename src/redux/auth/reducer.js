import axios from "../../index"; 
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
  return (dispatch) => {
    axios
      .post("/authenticate", values)
      .then((response) => {
        let data = response.data;
        dispatch(loginSuccess(data));
        let { user } = data;
        if (user) {
          if (user.roleDTO) {
            let { roleDTO } = user;
            if (roleDTO.roleId === 2) {
              dispatch(getStudentDetail(data.token, user.ownerId, user));
            } else if (roleDTO.roleId === 3) {
              dispatch(getTeacherDetail(user.ownerId));
            }
          }
        }
      })
      .catch((err) => dispatch({ type: FAILURE(authActionType.LOGIN) }));
    return { type: REQUEST(authActionType.LOGIN) };
  };
};

const loginSuccess = (values) => {
  return { type: SUCCESS(authActionType.LOGIN), payload: values.jwttoken };
};

export const logout = () => {
  return {
    type: authActionType.LOGOUT,
  };
};

export const getStudentDetail = (token, studentId, user) => {
  return (dispatch) => {
    // axios.defaults.headers.common["Authorization"] = `Bearer  ${token}`;
    axios
      .get(`/students/${studentId}`)
      .then((response) => {
        dispatch(getStudentDetailSuccess({ userDetail: response.data, user: user }));
      })
      .catch(dispatch(getStudentDetailFailed()));
    return {
      type: authActionType.GET_STUDENT_DETAIL,
    };
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
  return {
    type: authActionType.GET_TEACHER_DETAIL,
    payload: axios
      .get(`/employee/${teacherId}`)
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
      console.log("lgon ok");
      localStorage.setItem("token", action.payload);
      return {
        ...state,
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
    case FAILURE(authActionType.GET_STUDENT_DETAIL):
      return {
        ...state,
      };
    case SUCCESS(authActionType.GET_STUDENT_DETAIL):
      localStorage.setItem("token", action.payload.user.jwttoken);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        isLogin: true,
        user: action.payload,
        role: ROLE.STUDENT,
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
      };
    default:
      return state;
  }
};
