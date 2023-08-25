import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT,
  LOADING_ON,
  LOADING_OFF,
  NOTIFICATION,
} from "../utils/actionTypes";
import api from "../services/api";

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: LOADING_ON });
    try {
      const response = await api.post("/auth/login", { email, password });
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      dispatch({ type: LOADING_OFF });
    } catch (error) {
      dispatch({ type: LOADING_OFF });
      dispatch({ type: LOGIN_FAILURE });
      dispatch({
        type: NOTIFICATION,
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };
};

export const register = (name, email, password) => {
  return async (dispatch) => {
    dispatch({ type: LOADING_ON });
    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      dispatch({ type: REGISTER_SUCCESS, payload: response.data });
      dispatch({ type: LOADING_OFF });
    } catch (error) {
      dispatch({ type: LOADING_OFF });
      dispatch({
        type: REGISTER_FAILURE,
      });
      dispatch({
        type: NOTIFICATION,
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({ type: LOADING_ON });
    try {
      const response = await api.get("/auth/logout");
      dispatch({ type: LOGOUT, payload: response.data });
      dispatch({ type: LOADING_OFF });
    } catch (error) {
      dispatch({ type: LOGOUT });
      dispatch({ type: LOADING_OFF });
      dispatch({
        type: NOTIFICATION,
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };
};
