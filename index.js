const express = require("express");
const cors = require("cors");
require("dotenv").config();

// create app
const app = express();

// middleware
app.use(cors());
app.use(express());

const port = process.env.PORT || 5000;

app.use("/", (req, res) => {
  try {
    res.send("Expense Analyzer server is running");
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

app.listen(port, () => {
  console.log("Analyzer server is running on port", port);
});
