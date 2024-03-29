const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 8080;

//process.env.PORT
//process.env.NODE_ENV => production or undefined

//middleware
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "client/build")));

if (process.env.NODE_ENV === "production") {
  //serve static content
  //npm run build
  app.use(express.static(path.join(__dirname, "client/build")));
}

console.log(__dirname);
console.log(path.join(__dirname, "client/build"));

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
    const like = await pool.query(
      "INSERT INTO likes (post_id, profile_id) VALUES ($1, $2) RETURNING *",

      [postId, userId]
    );
    const likeId = like.rows[0].id;
    await pool.query("INSERT INTO like_notification (like_id) VALUES ($1)", [
      likeId,
    ]);
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

// Delete comment

app.delete("/comment/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;
    await pool.query("DELETE FROM comment WHERE id=$1", [commentId]);
    res.json("Comment was deleted");
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
    const commentId = comment.rows[0].id;
    await pool.query(
      "INSERT INTO comment_notification (comment_id) VALUES ($1)",
      [commentId]
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

//Get comments notifications

app.get("/comment_nots/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    let commentNots = await pool.query(
      "SELECT comment.id, post.content, comment.profile_id FROM comment_notification INNER JOIN comment ON comment.id = comment_notification.comment_id INNER JOIN post ON post.id = comment.post_id WHERE post.profile_id=$1 LIMIT 5",
      [userId]
    );
    let commentsArray = [];
    for (let index = 0; index < commentNots.rows.length; index++) {
      const element = commentNots.rows[index];
      const authorName = await pool.query(
        "Select profile.name FROM profile WHERE profile.id=$1",
        [element.profile_id]
      );
      const commentObj = { ...element, authorName: authorName.rows[0].name };
      commentsArray.push(commentObj);
    }
    res.json(commentsArray);
  } catch (err) {
    console.log(err.message);
    res.json(err.message);
  }
});

// Get Like notifications

app.get("/like_nots/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    let likeNots = await pool.query(
      "SELECT likes.id, post.content, likes.profile_id FROM like_notification INNER JOIN likes ON likes.id = like_notification.like_id INNER JOIN post ON post.id = likes.post_id WHERE post.profile_id=$1 LIMIT 5",
      [userId]
    );
    let likesArray = [];
    for (let index = 0; index < likeNots.rows.length; index++) {
      const element = likeNots.rows[index];
      const authorName = await pool.query(
        "Select profile.name FROM profile WHERE profile.id=$1",
        [element.profile_id]
      );
      const likeObj = { ...element, authorName: authorName.rows[0].name };
      likesArray.push(likeObj);
    }
    res.json(likesArray);
  } catch (err) {
    console.log(err.message);
    res.json(err.message);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT} 👍`);
});
