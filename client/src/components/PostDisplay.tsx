import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import DeleteIcon from "@mui/icons-material/Delete";

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
  cursor: "pointer",
}));
const DislikeAction = styled(Stack)(({ theme }) => ({
  borderRight: "1px solid",
  paddingRight: "4rem",
  paddingLeft: "1rem",
  cursor: "pointer",
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
  const { authorId, authorInitials, authorName, content, date, id, tags } =
    post;

  const dateString = date.toString().slice(0, 15);

  const userContext = useContext(UserContext);

  // HANDLE LIKES

  const [likes, setLikes] = useState<string[]>([]);

  const getLikes = async () => {
    let response = await fetch(`http://localhost:8080/likes/${id.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let result = await response.json();
    setLikes(result);
  };

  useEffect(() => {
    getLikes();
  }, []);

  const handleLike = async () => {
    if (!userContext.user.userId) {
      alert("Please login to like or comment");
      return;
    }
    let response = await fetch("http://localhost:8080/like-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: id,
        userId: userContext.user.userId,
      }),
    });
    const result = await response.json();
    if (result === "like added succesfully") {
      setLikes([...likes, userContext.user.userId]);
    }
  };

  const handleRemoveLike = async () => {
    let response = await fetch("http://localhost:8080/remove-like", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: id,
        userId: userContext.user.userId,
      }),
    });
    const result = await response.json();
    if (result === "like removed succesfully") {
      const likesAfterRemoving = likes.filter(
        (user) => user !== userContext.user.userId
      );
      setLikes(likesAfterRemoving);
    }
  };

  // DELETE POST FUNCTIONALITY

  const deletePost = async () => {
    let response = await fetch(`http://localhost:8080/post/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result);
    if (result === "post removed succesfully") {
      window.location.reload();
    }
  };

  // RENDER TAGS

  const renderTags = tags.map((tag) => {
    return (
      <TagBox key={tag.id}>
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
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="postContent">{content}</Typography>
        {authorId.toString() === userContext.user.userId && (
          <DeleteIcon
            sx={{ height: "5rem", width: "5rem", cursor: "pointer" }}
            onClick={deletePost}
          />
        )}
      </Stack>
      <Stack flexDirection="row" gap={3}>
        {renderTags}
      </Stack>
      <Stack flexDirection="row" gap={8} marginTop={5}>
        {likes.includes(userContext.user.userId) ? (
          <DislikeAction
            flexDirection="row"
            alignItems="center"
            gap={4}
            onClick={handleRemoveLike}
          >
            <FavoriteIcon
              sx={{ color: "primary.dark", height: "2rem", width: "2rem" }}
            />
            <Typography variant="addCommentLike">
              Likes ({likes.length})
            </Typography>
          </DislikeAction>
        ) : (
          <LikeAction
            flexDirection="row"
            alignItems="center"
            gap={4}
            onClick={handleLike}
          >
            <FavoriteBorderIcon
              sx={{ color: "primary.dark", height: "2rem", width: "2rem" }}
            />
            <Typography variant="addCommentLike">
              Likes ({likes.length})
            </Typography>
          </LikeAction>
        )}
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
