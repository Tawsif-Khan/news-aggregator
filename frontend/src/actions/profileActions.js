import {
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
} from "../utils/actionTypes";
import api from "../services/api";

export const getProfile = () => {
  return async (dispatch) => {
    try {
      // Make API request to get profile
      const response = await api.get("/auth/check");

      // Dispatch get profile success action
      dispatch({ type: GET_PROFILE_SUCCESS, payload: response.data });
    } catch (error) {
      // Dispatch get profile failure action
      dispatch({ type: GET_PROFILE_FAILURE, payload: error.message });
    }
  };
};

export const updateProfile = (name, email, password) => {
  return async (dispatch) => {
    try {
      // Make API request to update profile
      const response = await api.post("/me", { name, email, password });

      // Dispatch update profile success action
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: response.data });
    } catch (error) {
      // Dispatch update profile failure action
      dispatch({
        type: UPDATE_PROFILE_FAILURE,
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };
};
