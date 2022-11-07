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
      "INSERT INTO profile (name, email, password) VALUES($1, $2, $3)",
      [name, email, password]
    );

    res.json(newProfile);
  } catch (err) {
    console.log(err.message);
  }
});

//Get profile data for login

app.get("/profile", async (req, res) => {
  try {
    const { email, password } = req.body;
    const profileData = await pool.query(
      "SELECT * FROM profile WHERE email=$1 AND password=$2",
      [email, password]
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

//Comment on post

//React to post

//Delete post

//Delete comment

//Delete reaction

app.listen(8080, () => {
  console.log(`Server has started on port ${PORT} 👍`);
});
