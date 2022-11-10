const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

// middlewares
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qs0fhx1.mongodb.net/?retryWrites=true&w=majority`;

// console.log(uri);

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const serviceCollection = client.db("serviceReview").collection("services");
    const reviewCollection = client.db("serviceReview").collection("reviews");

    app.get("/home", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query).limit(3);
      const services = await cursor.toArray();
      res.send(services);
    });

    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });

    app.post("/services", async (req, res) => {
      const service = req.body;
      const result = await serviceCollection.insertOne(service);
      res.send(result);
    });
  } finally {
  }
}
run().catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("Naturegraphy server is running successfully");
});

app.listen(port, () => {
  console.log("Naturegraphy server is running successfully on port:", port);
});

module.exports = app;
