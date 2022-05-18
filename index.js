const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yckv1.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run(){
    try{
     await client.connect();
     const userCollection = client.db('job_task').collection('tasks');
    
     //===Get===//
     app.get('/user',async(req, res)=>{
         const query = {};
         const cursor = userCollection.find(query);
         const users = await cursor.toArray();
         res.send(users)
     });
     //===POST===//
     app.post('/user', async(req, res)=>{
         const newUser = req.body;
         const result = await userCollection.insertOne(newUser);
         res.send(result)
     })

    }
    finally{

    }

}
run().catch(console.dir);


app.get("/", (req, res) => {
  res.send("Server is Running");
});

app.listen(port, () => {
  console.log("listening to port", port);
});
