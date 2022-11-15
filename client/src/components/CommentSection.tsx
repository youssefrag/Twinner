import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

import { Comment } from "../models";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import { styled } from "@mui/material/styles";

const MainContainer = styled(Stack)(({ theme }) => ({
  marginTop: "4rem",
  paddingLeft: "3rem",
  [theme.breakpoints.down("lg")]: {
    paddingLeft: "1rem",
  },
}));

const InitialBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.dark,
  height: "3rem",
  width: "3rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "1.2rem",
  borderRadius: "50%",
  flexShrink: 0,
  [theme.breakpoints.down("lg")]: {
    fontSize: "1rem",
  },
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const CommentBox = styled(Stack)(({ theme }) => ({
  paddingLeft: "3rem",
  marginTop: "4rem",
  [theme.breakpoints.down("lg")]: {
    paddingLeft: "1rem",
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "50%",
  "& .MuiOutlinedInput-root": {
    borderRadius: "50px",
    background: theme.palette.primary.light,
  },
  "& .MuiInputBase-input": {
    fontSize: "1rem",
    fontWeight: 600,
    color: theme.palette.primary.dark,
  },
  [theme.breakpoints.down("sm")]: {
    width: "70%",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  fontSize: "1rem",
  padding: "0.5rem 1.2rem",
  color: theme.palette.primary.dark,
  borderRadius: "30px",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.light,
  },
  [theme.breakpoints.down("lg")]: {
    fontSize: "0.8rem",
    padding: "0.4rem 1rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.6rem",
    padding: "0.3rem 0.8rem",
  },
}));

interface Props {
  postId: string;
}

const CommentSection = ({ postId }: Props) => {
  const userContext = useContext(UserContext);

  // GET INITIALS

  let initials = "";

  if (userContext.user.name) {
    const nameArray = userContext.user.name.split(" ");

    initials += nameArray[0][0].toUpperCase();
    initials += nameArray[nameArray.length - 1][0].toUpperCase();
  }

  // Handle post comment

  const [postComment, setPostComment] = useState<string>("");

  const handleChangePostComment = (e: React.FormEvent) => {
    const element = e.currentTarget as HTMLInputElement;
    const value = element.value;
    setPostComment(value);
  };

  // Handle submit comment

  const handleSubmitComment = async () => {
    if (!postComment) {
      return;
    }
    let response = await fetch("/add-comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postComment,
        postId,
        userId: userContext.user.userId,
      }),
    });
    const result = await response.json();

    if (result.rows[0].id) {
      window.location.reload();
    }
  };

  // Handle get comments

  let [comments, setComments] = useState<Comment[]>([]);

  const getAllComments = async () => {
    let response = await fetch(`/comments/${postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    let commentsArray = [];
    for (let i = 0; i < result.rows.length; i++) {
      let initials = "";

      const nameArray = result.rows[i].name.split(" ");

      initials += nameArray[0][0].toUpperCase();
      initials += nameArray[nameArray.length - 1][0].toUpperCase();

      let commentObj: Comment = {
        id: result.rows[i].id,
        postId,
        authorId: result.rows[i].profile_id,
        authorName: result.rows[i].name,
        authorInitials: initials,
        content: result.rows[i].content,
      };
      commentsArray.push(commentObj);
    }
    setComments(commentsArray);
  };

  useEffect(() => {
    getAllComments();
  }, []);

  // Handle Delete Comment

  const handleDeleteComment = async (id: string) => {
    let response = await fetch(`/comment/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result);
    if (result === "Comment was deleted") {
      const newComments = comments.filter(
        (deletedComment) => deletedComment.id !== id
      );
      // console.log(newComments);
      setComments(newComments);
    }
  };

  // Render Comments Component

  const renderComments = comments.map((comment) => {
    const { id, authorId, authorName, authorInitials, content } = comment;
    return (
      <Stack
        key={id}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ borderBottom: "1px solid", paddingBottom: 7 }}
      >
        <Stack flexDirection="row" gap={6} alignItems="center" key={comment.id}>
          <InitialBox>{authorInitials}</InitialBox>
          <Stack gap={3}>
            <Typography variant="addCommentLike">{authorName}</Typography>
            <Typography sx={{ color: "#302061", fontSize: "1.1rem" }}>
              {content}
            </Typography>
          </Stack>
        </Stack>
        {userContext.user.userId == authorId && (
          <DeleteIcon
            sx={{ cursor: "pointer" }}
            onClick={() => handleDeleteComment(id)}
          />
        )}
      </Stack>
    );
  });

  return (
    <MainContainer>
      <>
        {userContext.isUserLoggedIn && (
          <Stack flexDirection="row" gap={3} alignItems="center">
            <InitialBox>{initials}</InitialBox>
            <StyledTextField
              onChange={handleChangePostComment}
              placeholder="Write a comment..."
              inputProps={{ maxLength: 150 }}
            />
            <StyledButton onClick={handleSubmitComment}>
              Add comment
            </StyledButton>
          </Stack>
        )}
        <CommentBox gap={8}>{renderComments}</CommentBox>
      </>
    </MainContainer>
  );
};

export default CommentSection;
