import React from "react";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";

import { Post } from "../models";

import { styled } from "@mui/material/styles";

const PostContainer = styled(Stack)(({ theme }) => ({
  borderBottom: "1px solid",
  marginTop: "4rem",
  paddingBottom: "4rem",
}));

const InitialBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.primary.light,
  height: "4rem",
  width: "4rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "1.4rem",
  borderRadius: "50%",
}));

interface Props {
  post: Post;
}

const PostDisplay: React.FC<Props> = ({ post }) => {
  const { authorInitials, authorName, content, date, id, tags } = post;

  const dateString = date.toString().slice(0, 15);

  return (
    <PostContainer>
      <Stack flexDirection="row" alignItems="center" gap={4}>
        <InitialBox>{authorInitials}</InitialBox>
        <Stack gap={2}>
          <Typography variant="authorName">{authorName}</Typography>
          <Typography variant="displayTags">{dateString}</Typography>
        </Stack>
      </Stack>
      <Typography>{content}</Typography>
    </PostContainer>
  );
};

export default PostDisplay;
