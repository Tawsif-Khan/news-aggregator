import {
  LOAD_CATEGORIES_SUCCESS,
  NOTIFICATION,
  LOADING_ON,
  LOADING_OFF,
} from "../utils/actionTypes";
import api from "../services/api";

export const loadCategory = () => {
  return async (dispatch, getState) => {
    // Check if categories are already loaded
    const { categories } = getState().categories;
    if (categories.length > 0) {
      return;
    }
    try {
      dispatch({ type: LOADING_ON });
      const response = await api.get("/categories");
      const categories = response.data.map((category) => category.name);
      dispatch({
        type: LOAD_CATEGORIES_SUCCESS,
        payload: categories,
      });
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
