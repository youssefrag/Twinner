import React from "react";

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";

import { styled } from "@mui/material/styles";

// const StyledAppBar = styled(AppBar)(({ theme }) => {
//     [theme.breakpoints.down("md")]: {
//         marginLeft: "50px",
//       },
// });

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

const MobileNavbar = () => {
  return (
    <StyledAppBar
      position="fixed"
      color="primary"
      sx={{ top: "auto", bottom: 0 }}
    >
      <Toolbar>
        <IconButton color="inherit" aria-label="open drawer"></IconButton>

        <Box sx={{ flexGrow: 1 }} />
        <IconButton color="inherit"></IconButton>
        <IconButton color="inherit"></IconButton>
      </Toolbar>
    </StyledAppBar>
  );
};

export default MobileNavbar;
