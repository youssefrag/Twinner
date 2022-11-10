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

app.get("posts", async (req, res) => {
  try {
    const posts = await pool.query("SELECT * FROM post;");
    res.json(posts);
  } catch (err) {
    console.log(err.message);
  }
});

//Create post

app.post("/posts", async (req, res) => {
  try {
    const { userId, content } = req.body;
    const post = await pool.query(
      "INSERT INTO post (profile_id, content) VALUES($1, $2)",
      [userId, content]
    );
  } catch (err) {
    console.error(err.message);
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

//Comment on post

//React to post

//Delete post

//Delete comment

//Delete reaction

app.listen(8080, () => {
  console.log(`Server has started on port ${PORT} 👍`);
});
