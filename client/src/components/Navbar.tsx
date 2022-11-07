import React from "react";

import { Box, Drawer } from "@mui/material";

const drawerWidth = 240;

const Navbar = () => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    ></Drawer>
  );
};

export default Navbar;
