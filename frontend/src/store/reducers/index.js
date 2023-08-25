import { combineReducers } from "redux";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import spinnerReducer from "./spinnerReducer";
import errorReducer from "./errorReducer";
import sourceReducer from "./sourceReducer";
import categoryReducer from "./categoryReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  spinner: spinnerReducer,
  errors: errorReducer,
  sources: sourceReducer,
  categories: categoryReducer,
});

export default rootReducer;
