import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

import TagPosts from "./TagPosts";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";

import { styled } from "@mui/material/styles";

import { Tag } from "./../models";

const StyledContainerBox = styled(Box)(({ theme }) => ({
  marginLeft: "300px",
  marginRight: "200px",
  marginTop: "40px",
  backgroundColor: "#fff",
  padding: "3rem",
  borderRadius: "30px",
  boxShadow: "3px 2px 16px 3px rgba(0,0,0,0.34)",
}));

const InitialBox = styled(Box)(({ theme }) => ({
  alignSelf: "flex-start",
  marginTop: "30px",
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

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    background: theme.palette.primary.light,
  },
  "& .MuiInputBase-input": {
    fontSize: "1.2rem",
    fontWeight: 700,
    color: theme.palette.primary.dark,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  alignSelf: "flex-end",
  backgroundColor: theme.palette.primary.dark,
  fontSize: "1.4rem",
  padding: "0.5rem 1.2rem",
  color: "#fff",
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.dark,
  },
}));

const CreatePost = () => {
  const userContext = useContext(UserContext);

  let [tags, setTags] = useState<Tag[]>([]);

  let [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  let [content, setContent] = useState<string>("");

  const handleContentChange = (e: React.FormEvent) => {
    const element = e.currentTarget as HTMLInputElement;
    const value = element.value;
    setContent(value);
  };

  const handlePostSubmit = async () => {
    if (content === "") {
      return;
    }
    let response = await fetch("http://localhost:8080/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: content,
        selectedTags: selectedTags,
        userId: userContext.user.userId,
      }),
    });
    let result = await response.json();
    console.log(result);
    if (result === "Post and tags succesfully added") {
      window.location.reload();
    }
  };

  const getTags = async () => {
    let response = await fetch("http://localhost:8080/allTags", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let result = await response.json();
    setTags(result.rows);
  };

  useEffect(() => {
    getTags();
  }, []);

  if (userContext.isUserLoggedIn) {
    let initials = "";

    const nameArray = userContext.user.name.split(" ");

    initials += nameArray[0][0].toUpperCase();
    initials += nameArray[nameArray.length - 1][0].toUpperCase();

    return (
      <StyledContainerBox>
        <Typography variant="mainSubHeading">Create Post</Typography>
        <Stack flexDirection="row" alignItems="center" gap={5} marginTop={7}>
          <InitialBox>{initials}</InitialBox>
          <Stack sx={{ flex: 1 }}>
            <StyledTextField
              onChange={handleContentChange}
              multiline
              minRows={2}
              maxRows={4}
              placeholder="What's on your mind?"
              inputProps={{ maxLength: 300 }}
            />
            <Typography
              sx={{
                alignSelf: "flex-end",
                marginRight: "10px",
                marginTop: "10px",
              }}
              variant="characterCount"
            >
              {content.length}/300 characters
            </Typography>
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              marginTop={6}
            >
              <Box>
                <TagPosts
                  tags={tags}
                  setTags={setTags}
                  selectedTags={selectedTags}
                  setSelectedTags={setSelectedTags}
                />
              </Box>
              <StyledButton onClick={handlePostSubmit}>POST</StyledButton>
            </Stack>
          </Stack>
        </Stack>
      </StyledContainerBox>
    );
  }
};

export default CreatePost;
