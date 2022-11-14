import React, { useEffect, useState } from "react";

import FeedFilter from "./FeedFilter";

import { Box, Typography } from "@mui/material";

import { styled } from "@mui/material/styles";

import PostDisplay from "./PostDisplay";

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
  [theme.breakpoints.down("xl")]: {
    marginRight: "100px",
  },
  [theme.breakpoints.down("lg")]: {
    marginRight: "50px",
  },
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
    const tag_posts = result.tags;
    const dbPosts = result.posts;
    let postsArray = [];
    for (let i = 0; i < dbPosts.length; i++) {
      let postObj: Post = {
        id: "",
        authorId: "",
        authorName: "",
        authorInitials: "",
        content: "",
        tags: [],
        date: undefined,
      };
      postObj.id = dbPosts[i].id;
      postObj.authorName = dbPosts[i].name;
      postObj.authorId = dbPosts[i].profile_id;

      let initials = "";
      let nameArray = dbPosts[i].name.split(" ");
      initials += nameArray[0][0].toUpperCase();
      initials += nameArray[nameArray.length - 1][0].toUpperCase();
      postObj.authorInitials = initials;

      postObj.content = dbPosts[i].content;

      postObj.date = new Date(dbPosts[i].post_date);

      let tagsArray = [];

      for (let j = 0; j < tag_posts.length; j++) {
        if (tag_posts[j].post_id === dbPosts[i].id) {
          let tagObj: Tag = { id: "", name: "" };
          tagObj.id = tag_posts[j].tag_id;
          tagObj.name = tag_posts[j].name;
          tagsArray.push(tagObj);
        }
      }
      postObj.tags = tagsArray;

      postsArray.push(postObj);
    }
    setPosts(postsArray);
  };

  // Tags filter functionality

  let [tags, setTags] = useState<Tag[]>([]);
  let [filterTags, setFilterTags] = useState<Tag[]>([]);

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
    getAllPostsAndProfiles();
    getTags();
  }, []);

  let renderPosts: any[] = [];

  if (filterTags.length === 0) {
    renderPosts = posts.map((post) => {
      return <PostDisplay key={post.id} post={post} />;
    });
  } else {
    let filterTagIdArray: number[] = [];
    filterTags.forEach((tag) => {
      filterTagIdArray.push(Number(tag.id));
    });

    const filteredPosts = posts.filter((post) => {
      let postTagIdArray: number[] = [];
      post.tags.forEach((tag) => {
        postTagIdArray.push(Number(tag.id));
      });
      const filteredPostsArray = posts.filter((post) =>
        filterTagIdArray.every((tag) => {
          return postTagIdArray.includes(tag);
        })
      );
      renderPosts = filteredPostsArray.map((post) => {
        return <PostDisplay key={post.id} post={post} />;
      });
    });
  }

  return (
    <StyledContainerBox>
      <Typography variant="mainSubHeading">Feed</Typography>
      <Box sx={{ marginTop: { xl: "3rem", lg: "2rem" } }}>
        <FeedFilter
          tags={tags}
          selectedTags={filterTags}
          setSelectedTags={setFilterTags}
        />
      </Box>
      {renderPosts}
    </StyledContainerBox>
  );
};

export default Feed;
