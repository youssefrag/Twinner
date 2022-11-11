import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";

import { styled } from "@mui/material/styles";

const MainContainer = styled(Stack)(({ theme }) => ({
  marginTop: "4rem",
  paddingLeft: "3rem",
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
}));

interface Props {
  postId: string;
}

const CommentSection = ({ postId }: Props) => {
  const userContext = useContext(UserContext);

  // GET INITIALS

  let initials = "";

  const nameArray = userContext.user.name.split(" ");

  initials += nameArray[0][0].toUpperCase();
  initials += nameArray[nameArray.length - 1][0].toUpperCase();

  console.log(initials);
  return (
    <MainContainer>
      {userContext.isUserLoggedIn && (
        <Stack flexDirection="row" gap={3} alignItems="center">
          <InitialBox>{initials}</InitialBox>
          <StyledTextField
            // onChange={handleContentChange}
            placeholder="Write a comment..."
            inputProps={{ maxLength: 150 }}
          />
          <StyledButton>Add comment</StyledButton>
        </Stack>
      )}
    </MainContainer>
  );
};

export default CommentSection;
