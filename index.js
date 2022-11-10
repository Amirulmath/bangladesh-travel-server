const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());

const service = require('./data/service.json');

app.get('/service', (req, res) =>{
    res.send(service);
});

app.get('/', (req, res) => {
    res.send('Bangladesh Travel server is running')
})

app.listen(port, () => {
    console.log(`Bangladesh Travel server running on ${port}`);
})

