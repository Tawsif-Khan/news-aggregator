import { NOTIFICATION, CLEAR_NOTIFICATION } from "../../utils/actionTypes";

const initialState = {
  message: null,
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION:
      return {
        ...state,
        message: action.payload,
      };
    case CLEAR_NOTIFICATION:
      return {
        ...state,
        message: null,
      };
    default:
      return state;
  }
};

export default errorReducer;
