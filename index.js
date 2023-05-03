const express = require("express");
const app = express();
require("dotenv").config();

app.use("/", (req, res) => {
  res.status(200).send("Hello world");
});

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
