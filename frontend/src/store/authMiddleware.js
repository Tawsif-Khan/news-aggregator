import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_SUCCESS,
  LOGOUT,
  NOTIFICATION,
} from "../utils/actionTypes";
import api from "../services/api";
import history from "../utils/history";

let isAuthenticatedChecked = false;

const authMiddleware = (store) => (next) => async (action) => {
  const { type } = action;

  switch (type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS: {
      const { data, token } = action.payload;
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      history.push("/feed");
      window.location.reload();
      break;
    }

    case LOGOUT: {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
      history.push("/");
      window.location.reload();
      break;
    }

    default: {
      if (!isAuthenticatedChecked && store.getState().auth.token) {
        isAuthenticatedChecked = true;
        try {
          await api.get("/auth/check");
        } catch (error) {
          if (error.response && error.response.status === 401) {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            store.dispatch({
              type: LOGIN_FAILURE,
              payload: { error: "Token not valid" },
            });
            history.push("/");
            window.location.reload();
          } else {
            store.dispatch({
              type: NOTIFICATION,
              payload: error.response
                ? error.response.data.message
                : error.message,
            });
          }
        }
      } else {
        return next(action);
      }
    }
  }
};

export default authMiddleware;
