import React, { useState, useEffect } from "react";

import {
  Box,
  // Button,
  // Modal,
  Stack,
  // TextField,
  Typography,
} from "@mui/material";

import { Tag } from "../models";

import CreateTag from "./CreateTag";

import { styled } from "@mui/material/styles";

interface Props {
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  selectedTags: Tag[];
  setSelectedTags: React.Dispatch<React.SetStateAction<Tag[]>>;
}

const StyledTagBox = styled(Box)(({ theme }) => ({
  border: "1px solid",
  padding: "0.2rem 0.8rem",
  borderRadius: "50px",
  cursor: "pointer",
}));

const TagPosts: React.FC<Props> = ({
  tags,
  setTags,
  selectedTags,
  setSelectedTags,
}: Props) => {
  const addToSelected = (tag: Tag) => {
    setSelectedTags([...selectedTags, tag]);
  };

  const renderTags = tags.map((tag) => (
    <StyledTagBox onClick={() => addToSelected(tag)}>
      <Typography variant="displayTags">{tag.name}</Typography>
    </StyledTagBox>
  ));

  return (
    <>
      <Typography variant="addTags">Add tags to your post</Typography>
      <Stack flexDirection="row" alignItems="center" gap={3} marginTop={5}>
        {renderTags}
        <CreateTag />
      </Stack>
    </>
  );
};

export default TagPosts;
