const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES

//Create post

//Comment on post

//React to post

//Delete post

//Delete comment

//Delete reaction

//Change reaction

app.listen(8080, () => {
  console.log(`Server has started on port ${PORT} 👍`);
});
