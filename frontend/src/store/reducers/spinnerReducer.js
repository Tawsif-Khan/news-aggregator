import { LOADING_ON, LOADING_OFF } from "../../utils/actionTypes";

const initialState = {
  loading: false,
};

const spinnerReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_ON:
      return {
        ...state,
        loading: true,
      };
    case LOADING_OFF:
      return {
        ...state,
        feed: [],
        loading: false,
      };
    default:
      return state;
  }
};

export default spinnerReducer;
