const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// create app
const app = express();

// middleware
app.use(cors());
app.use(express.json());

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

// database and collection create
const incomeCollection = client.db("analyser").collection("incomes");
const expenseCollection = client.db("analyser").collection("expenses");

// income api
app.get("/incomes", async (req, res) => {
  try {
    const query = {};
    const incomes = await incomeCollection
      .find(query)
      .sort({ time: -1 })
      .toArray();
    res.send({
      status: true,
      data: incomes,
      message: "Successfully data fetching",
    });
  } catch (error) {
    console.error(error);
    res.send({
      status: false,
      error: error.message,
      message: "Data fetching error!",
    });
  }
});

app.post("/incomes", async (req, res) => {
  try {
    const data = req.body;
    const result = await incomeCollection.insertOne(data);
    res.send({
      status: true,
      data: result,
      message: "Successfully data store",
    });
  } catch (error) {
    console.log(error.message);
    res.send({
      status: false,
      error: error.message,
      message: "Something wrong!",
    });
  }
});
app.delete("/incomes/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await incomeCollection.deleteOne(query);
    res.send({
      status: true,
      data: result,
      message: " Delete successful",
    });
  } catch (error) {
    console.log(error.message);
    res.send({
      status: false,
      error: error.message,
      message: "Something wrong!",
    });
  }
});
// expense api
app.get("/expenses", async (req, res) => {
  try {
    const query = {};
    const expenses = await expenseCollection
      .find(query)
      .sort({ time: -1 })
      .toArray();
    res.send({
      status: true,
      data: expenses,
      message: "Successfully data fetching",
    });
  } catch (error) {
    console.error(error);
    res.send({
      status: false,
      error: error.message,
      message: "Data fetching error!",
    });
  }
});

app.post("/expenses", async (req, res) => {
  try {
    const data = req.body;
    const result = await expenseCollection.insertOne(data);
    res.send({
      status: true,
      data: result,
      message: "Successfully data store",
    });
  } catch (error) {
    console.log(error.message);
    res.send({
      status: false,
      error: error.message,
      message: "Something wrong!",
    });
  }
});
app.delete("/expenses/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await expenseCollection.deleteOne(query);
    res.send({
      status: true,
      data: result,
      message: " Delete successful",
    });
  } catch (error) {
    console.log(error.message);
    res.send({
      status: false,
      error: error.message,
      message: "Something wrong!",
    });
  }
});

// root api
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
