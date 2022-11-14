const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;
const pool = require("./db/db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES

//Create porfile

app.post("/profiles", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newProfile = await pool.query(
      "INSERT INTO profile (name, email, password) VALUES($1, $2, $3) RETURNING *",
      [name, email, password]
    );
    res.json(newProfile);
  } catch (err) {
    res.json(err.message);
  }
});

//Get profile data for login

app.get("/profile/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const profileData = await pool.query(
      "SELECT * FROM profile WHERE email=$1",
      [email]
    );
    res.json(profileData);
  } catch (err) {
    console.log(err.message);
  }
});

//Get all posts

app.get("/posts", async (req, res) => {
  try {
    const posts = await pool.query(
      "SELECT post.profile_id, post.id, post.content, post.post_date, profile.name FROM post JOIN profile ON post.profile_id = profile.id ORDER BY post.post_date DESC"
    );
    const tags = await pool.query(
      "SELECT post.id as post_id, tag_post.tag_id, tag.name FROM post JOIN tag_post ON post.id = tag_post.post_id JOIN tag ON tag.id = tag_post.tag_id"
    );
    res.json({ posts: posts.rows, tags: tags.rows });
  } catch (err) {
    console.log(err.message);
    res.json(err.message);
  }
});

//Create post

app.post("/posts", async (req, res) => {
  try {
    const { content, selectedTags, userId } = req.body;
    const post = await pool.query(
      "INSERT INTO post (profile_id, content) VALUES($1, $2) RETURNING id",
      [userId, content]
    );
    const postId = post.rows[0].id;
    for (let i = 0; i < selectedTags.length; i++) {
      const tagId = selectedTags[i].id;
      await pool.query(
        "INSERT INTO tag_post (post_id, tag_id) VALUES ($1, $2)",

        [postId, tagId]
      );
    }
    res.json("Post and tags succesfully added");
  } catch (err) {
    res.json(err.message);
  }
});

//Create Tag

app.post("/createTag", async (req, res) => {
  try {
    const newTag = req.body.newTag;
    await pool.query(
      "INSERT INTO tag (name) VALUES ($1)",

      [newTag]
    );
    res.json("Tag added succesfully");
  } catch (err) {
    res.json(err.message);
  }
});

//Get Tags

app.get("/allTags", async (req, res) => {
  try {
    const allTags = await pool.query("SELECT * FROM tag");
    res.json(allTags);
  } catch (err) {
    res.json(err.message);
  }
});

//Like post

app.post("/like-post", async (req, res) => {
  try {
    const { postId, userId } = req.body;
    await pool.query(
      "INSERT INTO likes (post_id, profile_id) VALUES ($1, $2)",

      [postId, userId]
    );
    res.json("like added succesfully");
  } catch (errs) {
    res.json(err.message);
  }
});

//Get likes for post

app.get("/likes/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const postIdNum = Number(postId);
    const likes = await pool.query("SELECT * FROM likes WHERE post_id=$1", [
      postIdNum,
    ]);
    const likesArray = [];
    for (let i = 0; i < likes.rows.length; i++) {
      likesArray.push(likes.rows[i].profile_id.toString());
    }
    res.json(likesArray);
  } catch (err) {
    console.log(err.message);
    res.json(err.message);
  }
});

//Delete like

app.delete("/remove-like", async (req, res) => {
  try {
    const { postId, userId } = req.body;
    await pool.query(
      "DELETE FROM likes WHERE post_id=$1 AND profile_id=$2",

      [postId, userId]
    );
    res.json("like removed succesfully");
  } catch (errs) {
    res.json(err.message);
  }
});

//Delete post

app.delete("/post/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    await pool.query(
      "DELETE FROM post WHERE id=$1",

      [postId]
    );
    res.json("post removed succesfully");
  } catch (err) {
    res.json(err.message);
  }
});

//Comment on post

app.post("/add-comment", async (req, res) => {
  try {
    const { postComment, postId, userId } = req.body;
    const comment = await pool.query(
      "INSERT INTO comment (profile_id, post_id, content) VALUES ($1, $2, $3) RETURNING *",
      [userId, postId, postComment]
    );
    res.json(comment);
  } catch (err) {
    console.log(err.message);
    res.json(err.message);
  }
});

//Get comment for post

app.get("/comments/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await pool.query(
      "SELECT comment.id, comment.content as content, comment.profile_id, profile.name FROM comment JOIN profile ON comment.profile_id = profile.id WHERE comment.post_id=$1",
      [postId]
    );
    res.json(comments);
  } catch (err) {
    console.log(err.message);
    res.json(err.message);
  }
});

//Delete comment

app.listen(8080, () => {
  console.log(`Server has started on port ${PORT} 👍`);
});
