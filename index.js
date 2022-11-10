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
        const serviceCollection = client.db('bdTourist').collection('places');
        const placeCollection = client.db('bdTourist').collection('places');

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
            const service = await serviceCollection.findOne(query);
            res.send(service);   
        })


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

