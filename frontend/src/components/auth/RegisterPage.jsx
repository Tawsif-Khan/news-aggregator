import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../actions/authActions";
import { Box, Typography, Button, Stack } from "@mui/material";
import CustomTextField from "../forms/theme-elements/CustomTextField";

const RegisterPage = ({ title, subtitle, subtext }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    dispatch(register(name, email, password));
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="text"
            mb="5px"
          >
            Name
          </Typography>
          <CustomTextField
            id="name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
        </Box>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="email"
            mb="5px"
          >
            Email
          </Typography>
          <CustomTextField
            id="username"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
        </Box>
        <Box mt="25px">
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Password
          </Typography>
          <CustomTextField
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            fullWidth
          />
        </Box>
      </Stack>
      <Box>
        <Button
          sx={{ mt: 1.5 }}
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          onClick={handleRegister}
          type="submit"
        >
          Register
        </Button>
      </Box>
      {subtitle}
    </>
  );
};

export default RegisterPage;
