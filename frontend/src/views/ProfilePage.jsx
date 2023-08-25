import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Button, TextField } from "@mui/material";
import PageContainer from "../components/container/PageContainer";
import DashboardCard from "../components/shared/DashboardCard";
import {
  NOTIFICATION,
  LOADING_ON,
  LOADING_OFF,
  UPDATE_PREFERRRED_SETTINGS,
} from "../utils/actionTypes";
import api from "../services/api";

const Profile = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.profile.data);

  const [profile, setProfile] = useState({
    name: userData.name,
    email: userData.email,
    password: "",
  });

  const [userProfileUpdate, setUserProfileUpdate] = useState(false);

  const enableUpdateProfile = () => {
    setUserProfileUpdate(!userProfileUpdate);
    setProfile({
      name: userData.name,
      email: userData.email,
    });
  };

  const updateProfile = async () => {
    try {
      dispatch({ type: LOADING_ON });
      await api.put("/user/profile-update", profile);
      dispatch({ type: LOADING_OFF });
      dispatch({
        type: UPDATE_PREFERRRED_SETTINGS,
        payload: {
          ...userData,
          email: profile.email,
          name: profile.name,
        },
      });
      dispatch({
        type: NOTIFICATION,
        payload: "Profile Updated Successfully",
      });
    } catch (error) {
      dispatch({
        type: NOTIFICATION,
        payload: error.response ? error.response.data.message : error.message,
      });
      dispatch({ type: LOADING_OFF });
    }
  };

  return (
    <PageContainer
      title={"Update User - " + userData.name}
      description="Update Profile"
    >
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <DashboardCard
            title="User Profile"
            subtitle="Update your profile"
            action={
              <Button
                variant="outlined"
                color={userProfileUpdate ? "error" : "primary"}
                onClick={enableUpdateProfile}
              >
                {userProfileUpdate ? "Cancel" : "Edit Profile"}
              </Button>
            }
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="User Name"
                  variant="outlined"
                  fullWidth
                  name="username"
                  disabled={!userProfileUpdate}
                  value={profile.name}
                  onChange={(event) => {
                    setProfile({ ...profile, name: event.target.value });
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  name="email"
                  disabled={!userProfileUpdate}
                  value={profile.email}
                  onChange={(event) => {
                    setProfile({ ...profile, email: event.target.value });
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              {userProfileUpdate && (
                <>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Password"
                      variant="outlined"
                      placeholder="Leave blank to keep the same password"
                      fullWidth
                      name="password"
                      onChange={(event) => {
                        setProfile({
                          ...profile,
                          password: event.target.value,
                        });
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Button
                      variant="contained"
                      size="medium"
                      onClick={updateProfile}
                    >
                      Update Profile
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Profile;
