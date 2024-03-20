const express = require('express');
const cors = require('cors');
const app =  express();
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ExplainVerbosity, ObjectId  } = require('mongodb');

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://r8ahim:p1of6bVFbzJa9m4C@cluster0.2pcmvwu.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = client.db('ordersDb');
    const ordersCollection = database.collection('orders');
    const accCollection = database.collection('account');
   app.post('/orders',async(req,res)=>{
    const orders = req.body;
    const result = await ordersCollection.insertOne(orders);
    res.send(result);
   })
   app.get('/orders',async(req,res)=>{
    const orderses= await ordersCollection.find().toArray();
    res.send(orderses)
   })
   app.post('/account',async(req,res)=>{
    const orders = req.body;
    const result = await accCollection.insertOne(orders);
    // res.send(result);
    console.log(orders)
   })
   app.get('/account',async(req,res)=>{
    const orderses= await accCollection.find().toArray();
    res.send(orderses)
   })
   app.delete('/account/:id', async (req, res) => {
    const id = req.body.id;

    res.send(id);
});        
     

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
    }
}
run().catch(console.dir);





app.get('/',(req,res)=>{
    res.send('order will seen here')
})
app.listen(port,()=>{
    console.log(`order port = ${port}`)
})
