import React from "react";

import { Drawer, Stack, Typography } from "@mui/material";

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
}));

const Navbar = () => {
  return (
    <StyledDrawer variant="permanent" anchor="left">
      <Stack alignItems="center" marginTop={5}>
        <Stack flexDirection="row">
          <Typography variant="logo">Twinner</Typography>
          <StyledLogoIcon />
        </Stack>
      </Stack>
    </StyledDrawer>
  );
};

export default Navbar;
