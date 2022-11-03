const express = require("express");
const app = express();
const cors = require("cors");

const PORT = 8080;

//middleware
app.use(cors());
app.use(express.json());

app.listen(8080, () => {
  console.log(`Server has started on port ${PORT} 👍`);
});
