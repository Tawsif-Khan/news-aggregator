import {
  LOAD_SOURCES_SUCCESS,
  NOTIFICATION,
  LOADING_ON,
  LOADING_OFF,
} from "../utils/actionTypes";
import api from "../services/api";

export const loadSources = () => {
  return async (dispatch, getState) => {
    // Check if sources are already loaded
    const { sources } = getState().sources;
    if (sources.length > 0) {
      return;
    }
    try {
      dispatch({ type: LOADING_ON });
      const response = await api.get("/sources");
      const sources = response.data.map((source) => source.name);
      dispatch({ type: LOAD_SOURCES_SUCCESS, payload: sources });
      dispatch({ type: LOADING_OFF });
    } catch (error) {
      dispatch({ type: LOADING_OFF });
      dispatch({
        type: NOTIFICATION,
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };
};
