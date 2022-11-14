import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

import { Box, Button, Drawer, Stack, Typography } from "@mui/material";

import { styled } from "@mui/material/styles";

import CampaignIcon from "@mui/icons-material/Campaign";

import LoginRegister from "./LoginRegister";
import Notifications from "./Notifications";

import Cookies from "js-cookie";

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    backgroundColor: theme.palette.primary.dark,
    width: 240,
    boxSizing: "border-box",
  },
}));

const StyledLogoIcon = styled(CampaignIcon)(({ theme }) => ({
  color: "#fff",
  height: "3rem",
  width: "3rem",
}));

const InitialBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
  height: "3rem",
  width: "3rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "1.4rem",
  borderRadius: "50%",
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
}));

const Navbar: React.FC = () => {
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
    <StyledDrawer variant="permanent" anchor="left">
      <Stack alignItems="center" marginTop={5} gap={7}>
        <Stack flexDirection="row" alignItems="center">
          <Typography variant="logo">Twinner</Typography>
          <StyledLogoIcon />
        </Stack>
        <Stack alignItems="center" gap={4}>
          {!userContext.isUserLoggedIn ? (
            <LoginRegister />
          ) : (
            <Stack gap={4}>
              <Stack flexDirection="row" alignItems="center" gap={4}>
                <InitialBox>{initials}</InitialBox>
                <Typography variant="displayName">
                  {userContext.user.name}
                </Typography>
              </Stack>
              <StyledButton onClick={handleLogout}>Logout</StyledButton>
            </Stack>
          )}
        </Stack>

        {userContext.isUserLoggedIn && <Notifications />}
      </Stack>
    </StyledDrawer>
  );
};

export default Navbar;
