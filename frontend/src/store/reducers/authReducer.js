import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT,
} from "../../utils/actionTypes";
const storedToken = localStorage.getItem("token");
const storedUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  isAuthenticated: !!storedToken,
  data: storedUser || null,
  token: storedToken || null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        data: action.payload.data,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        data: null,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        data: null,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        data: action.payload.data,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        data: null,
      };
    default:
      return state;
  }
};

export default authReducer;
