import React, { useState, useEffect } from "react";

import {
  // Box,
  // Button,
  // Modal,
  Stack,
  // TextField,
  Typography,
} from "@mui/material";

import CreateTag from "./CreateTag";

import { styled } from "@mui/material/styles";

const TagPosts = () => {
  return (
    <>
      <Typography variant="addTags">Add tags to your post</Typography>
      <Stack flexDirection="row">
        <CreateTag />
      </Stack>
    </>
  );
};

export default TagPosts;
