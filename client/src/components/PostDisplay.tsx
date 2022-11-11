import React from "react";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import CommentIcon from "@mui/icons-material/Comment";

import { Post } from "../models";

import { styled } from "@mui/material/styles";

const PostContainer = styled(Stack)(({ theme }) => ({
  borderBottom: "1px solid",
  marginTop: "4rem",
  paddingBottom: "4rem",
}));

const LikeAction = styled(Stack)(({ theme }) => ({
  borderRight: "1px solid",
  paddingRight: "4rem",
  paddingLeft: "1rem",
}));

const CommentAction = styled(Stack)(({ theme }) => ({
  borderRight: "1px solid",
  paddingRight: "4rem",
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

const TagBox = styled(Box)(({ theme }) => ({
  border: "1px solid",
  padding: "0.2rem 0.8rem",
  borderRadius: "50px",
  cursor: "pointer",
  backgroundColor: theme.palette.primary.dark,
}));

interface Props {
  post: Post;
}

const PostDisplay: React.FC<Props> = ({ post }) => {
  const { authorInitials, authorName, content, date, id, tags } = post;

  const dateString = date.toString().slice(0, 15);

  const renderTags = tags.map((tag) => {
    return (
      <TagBox>
        <Typography variant="displayTags" color="#fff">
          {tag.name}
        </Typography>
      </TagBox>
    );
  });

  return (
    <PostContainer gap={6}>
      <Stack flexDirection="row" alignItems="center" gap={4}>
        <InitialBox>{authorInitials}</InitialBox>
        <Stack gap={2}>
          <Typography variant="authorName">{authorName}</Typography>
          <Typography variant="displayTags">{dateString}</Typography>
        </Stack>
      </Stack>
      <Typography variant="postContent">{content}</Typography>
      <Stack flexDirection="row" gap={3}>
        {renderTags}
      </Stack>
      <Stack flexDirection="row" gap={8} marginTop={5}>
        <LikeAction flexDirection="row" alignItems="center" gap={4}>
          <FavoriteBorderIcon
            sx={{ color: "primary.dark", height: "2rem", width: "2rem" }}
          />
          <Typography variant="addCommentLike">Like </Typography>
        </LikeAction>
        <CommentAction flexDirection="row" alignItems="center" gap={4}>
          <CommentIcon
            sx={{ color: "primary.dark", height: "2rem", width: "2rem" }}
          />
          <Typography variant="addCommentLike">Comment</Typography>
        </CommentAction>
      </Stack>
    </PostContainer>
  );
};

export default PostDisplay;
