import React, { useEffect, useState } from "react";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";

import { styled } from "@mui/material/styles";

import { Tag } from "./../models";
import { Post } from "./../models";
import { Profile } from "./../models";

const StyledContainerBox = styled(Box)(({ theme }) => ({
  marginLeft: "300px",
  marginRight: "200px",
  marginTop: "50px",
  backgroundColor: "#fff",
  padding: "3rem",
  borderRadius: "30px",
  boxShadow: "3px 2px 16px 3px rgba(0,0,0,0.34)",
}));

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const getAllPostsAndProfiles = async () => {
    let response = await fetch("http://localhost:8080/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let result = await response.json();
    console.log(result);
  };

  useEffect(() => {
    getAllPostsAndProfiles();
  }, []);

  return (
    <StyledContainerBox>
      <Typography variant="mainSubHeading">Feed</Typography>
    </StyledContainerBox>
  );
};

export default Feed;
