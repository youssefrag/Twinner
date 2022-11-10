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
    // console.log(result);
    const tag_posts = result.tags;
    const dbPosts = result.posts;
    let postsArray = [];
    for (let i = 0; i < dbPosts.length; i++) {
      let postObj: Post = {
        id: "",
        authorName: "",
        authorInitials: "",
        content: "",
        tags: [],
        date: undefined,
      };
      postObj.id = dbPosts[i].id;
      postObj.authorName = dbPosts[i].name;

      let initials = "";
      let nameArray = dbPosts[i].name.split(" ");
      initials += nameArray[0][0].toUpperCase();
      initials += nameArray[nameArray.length - 1][0].toUpperCase();
      postObj.authorInitials = initials;

      postObj.content = dbPosts[i].content;

      postObj.date = new Date(dbPosts[i].post_date);

      let tagsArray = [];

      for (let j = 0; j < tag_posts.length; j++) {
        // console.log(tag_posts[j]);
        if (tag_posts[j].post_id === dbPosts[i].id) {
          let tagObj: Tag = { id: "", name: "" };
          tagObj.id = tag_posts[j].tag_id;
          tagObj.name = tag_posts[j].name;
          //   console.log(tagObj);
          tagsArray.push(tagObj);
        }
      }
      //   console.log(tagsArray);
      postObj.tags = tagsArray;

      postsArray.push(postObj);
    }
    setPosts(postsArray);
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