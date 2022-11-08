import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

import { Button, Drawer, Stack, Typography } from "@mui/material";

import { styled } from "@mui/material/styles";

import CampaignIcon from "@mui/icons-material/Campaign";

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

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  fontSize: "1rem",
  padding: "0.5rem 1.2rem",
  color: theme.palette.primary.dark,
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.dark,
    fontSize: "1.2rem",
  },
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
            <StyledButton>LOGIN/REGISTER</StyledButton>
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
