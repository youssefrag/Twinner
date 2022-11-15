import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

import {
  AppBar,
  Box,
  Toolbar,
  Button,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";

import Notifications from "./Notifications";
import LoginRegister from "./LoginRegister";

import CampaignIcon from "@mui/icons-material/Campaign";

import { styled } from "@mui/material/styles";

import Cookies from "js-cookie";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

const MainContainer = styled(Stack)(({ theme }) => ({
  marginTop: "4rem",
  paddingLeft: "3rem",
  [theme.breakpoints.down("lg")]: {
    paddingLeft: "1rem",
  },
}));

const InitialBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
  height: "2.4rem",
  width: "2.4rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "1.3rem",
  borderRadius: "50%",
  color: "#302061",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  fontSize: "1rem",
  padding: "0.5rem 1.2rem",
  color: theme.palette.primary.dark,
  "&:hover": {
    backgroundColor: "#fff",
    color: theme.palette.primary.dark,
  },
  [theme.breakpoints.down("lg")]: {
    fontSize: "0.8rem",
    padding: "0.4rem 0.1rem",
  },
}));

const MobileNavbar = () => {
  const userContext = useContext(UserContext);

  let initials = "";

  if (userContext.isUserLoggedIn) {
    const nameArray = userContext.user.name.split(" ");

    initials += nameArray[0][0].toUpperCase();
    initials += nameArray[nameArray.length - 1][0].toUpperCase();
  }

  const handleLogout = () => {
    Cookies.remove("userId");
    Cookies.remove("name");
    Cookies.remove("email");
    userContext.setUserLoggedIn(false);
    userContext.setUser({
      email: undefined,
      name: undefined,
      userId: undefined,
    });
  };

  return (
    <StyledAppBar
      position="fixed"
      color="primary"
      sx={{ top: "auto", bottom: 0 }}
    >
      <Toolbar>
        <Stack flexDirection="row" alignItems="center" gap={10} paddingLeft={5}>
          {userContext.isUserLoggedIn && <Notifications />}
          {userContext.isUserLoggedIn ? (
            <Stack flexDirection="row" gap={4}>
              <InitialBox>{initials}</InitialBox>
              <StyledButton onClick={handleLogout}>Logout</StyledButton>
            </Stack>
          ) : (
            <LoginRegister />
          )}
        </Stack>
      </Toolbar>
    </StyledAppBar>
  );
};

export default MobileNavbar;
