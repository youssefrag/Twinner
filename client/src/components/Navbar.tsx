import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

import { Drawer, Stack, Typography } from "@mui/material";

import { styled } from "@mui/material/styles";

import CampaignIcon from "@mui/icons-material/Campaign";

import LoginRegister from "./LoginRegister";

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

const Navbar: React.FC = () => {
  const userContext = useContext(UserContext);

  console.log(userContext);

  return (
    <StyledDrawer variant="permanent" anchor="left">
      <Stack alignItems="center" marginTop={5} gap={7}>
        <Stack flexDirection="row" alignItems="center">
          <Typography variant="logo">Twinner</Typography>
          <StyledLogoIcon />
        </Stack>
        <Stack alignItems="center" gap={4}>
          <Typography variant="navSubHeading">User</Typography>
          {userContext.user === null ? (
            <LoginRegister />
          ) : (
            <Typography>
              <>{userContext.user}</>
            </Typography>
          )}
        </Stack>
      </Stack>
    </StyledDrawer>
  );
};

export default Navbar;
