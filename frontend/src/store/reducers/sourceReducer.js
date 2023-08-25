import { LOAD_SOURCES_SUCCESS } from "../../utils/actionTypes";

const initialState = {
  sources: [],
};

const sourceReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SOURCES_SUCCESS:
      return {
        ...state,
        sources: action.payload,
      };
    default:
      return state;
  }
};

export default sourceReducer;
