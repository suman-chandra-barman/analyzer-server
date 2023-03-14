const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { MongoClient, ServerApiVersion } = require("mongodb");

// create app
const app = express();

// middleware
app.use(cors());
app.use(express());

const port = process.env.PORT || 5000;

// database
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.uhbaknf.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// connect with database
const dbConnect = () => {
  try {
    client.connect();
  } catch (error) {
    console.log("Database connection error", error);
  }
};
dbConnect();

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
