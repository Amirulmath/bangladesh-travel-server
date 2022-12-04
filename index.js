const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xjhllfd.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const serviceCollection = client.db('placeBd').collection('places');
        const placeCollection = client.db('placeBd').collection('places');
        const reviewCollection = client.db('placeBd').collection('reviews');

        app.get('/places', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query);
            const places = await cursor.toArray();
            res.send(places);
        });

        app.get('/places3', async (req, res) => {
            const query = {}
            const cursor = placeCollection.find(query);
            const place = await cursor.limit(3).toArray();
            res.send(place);
        });

        app.get('/places/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const places = await serviceCollection.findOne(query);
            res.send(places);   
        });

        // Reviews API
        app.get('/reviews', async (req, res) => {
            const query = {};
            const cursor = reviewCollection.find(query);
            const review = await cursor.toArray();
            res.send(review);
        });

        app.post('/reviews', async (req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);
        });

        app.delete('/reviews/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await reviewCollection.deleteOne(query);
            res.send(result);
        });

        app.get("/reviews/:id", async (req, res) => {
            try {
              const { id } = req.params;
          
              const product = await reviewCollection.findOne({ _id: ObjectId(id) });
          
              res.send({
                success: true,
                data: product,
              });
            } catch (error) {
              res.send({
                success: false,
                error: error.message,
              });
            }
          });
          
          app.patch("/reviews/:id", async (req, res) => {
            const { id } = req.params;
          
            try {
              const result = await reviewCollection.updateOne({ _id: ObjectId(id) }, { $set: req.body });
          
              if (result.matchedCount) {
                res.send({
                  success: true,
                  message: `successfully review updated ${req.body.name}`,
                });
              } else {
                res.send({
                  success: false,
                  error: "Couldn't update  the review",
                });
              }
            } catch (error) {
              res.send({
                success: false,
                error: error.message,
              });
            }
          });


    }
    finally{

    }
}

run().catch(err => console.error(err));


app.get('/', (req, res) => {
    res.send('Bangladesh Travel server is running')
})

app.listen(port, () => {
    console.log(`Bangladesh Travel server running on ${port}`);
})