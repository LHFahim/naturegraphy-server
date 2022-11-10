const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

// middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Naturegraphy server is running successfully");
});

app.listen(port, () => {
  console.log("Naturegraphy server is running successfully on port:", port);
});

module.exports = app;
