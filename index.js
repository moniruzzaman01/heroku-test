const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const onjectId = require("mongodb").ObjectId;
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("sended");
});
app.listen(port, () => {
  console.log("listening from", port);
});

const uri =
  "mongodb+srv://dbuser-1:v67TAugII75a8u9u@cluster0.pr56l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const userCollection = client.db("db-3").collection("users-3");

    //post data
    app.post("/user", async (req, res) => {
      console.log(req.body);
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    //get data
    app.get("/user", async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const user = await cursor.toArray();
      res.send(user);
    });

    //delete data
    app.delete("/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
    //   await client.close();
  }
}
run().catch(console.dir);
