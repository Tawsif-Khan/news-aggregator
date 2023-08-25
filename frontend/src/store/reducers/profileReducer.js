import { UPDATE_PREFERRRED_SETTINGS } from "../../utils/actionTypes";

const storedUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  data: storedUser || null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PREFERRRED_SETTINGS:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};

export default profileReducer;
