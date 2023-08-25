import React, { lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import Login from "./views/auth/login";
import Register from "./views/auth/register";
import Profile from "./views/ProfilePage";
import Feed from "./views/UserFeed";
import SearchArticle from "./views/SearchArticle";
import { useSelector, useDispatch } from "react-redux";
import history from "./utils/history";
import Loadable from "./layouts/full/shared/loadable/Loadable";
import { Backdrop, CircularProgress } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { CLEAR_NOTIFICATION } from "./utils/actionTypes";
import NotFoundPage from "./views/NotFoundPage";
const FullLayout = Loadable(lazy(() => import("./layouts/full/FullLayout")));
const BlankLayout = Loadable(lazy(() => import("./layouts/blank/BlankLayout")));

const App = () => {
  const loading = useSelector((state) => state.spinner.loading);
  const errors = useSelector((state) => state.errors);
  const dispatch = useDispatch();

  return (
    <Router history={history}>
      {loading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        ""
      )}
      <Snackbar
        open={!!errors.message} // Show Snackbar only when error exists
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        onClose={() => dispatch({ type: CLEAR_NOTIFICATION })}
      >
        <Alert variant="standard" color="info" severity="error">
          {errors.message}
        </Alert>
      </Snackbar>
      <Routes>
        <Route path="/" element={<BlankLayout />}>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
        </Route>

        <Route path="/" element={<FullLayout />}>
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/search"
            element={
              <PrivateRoute>
                <SearchArticle />
              </PrivateRoute>
            }
          />
          <Route
            path="/feed"
            element={
              <PrivateRoute>
                <Feed />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
