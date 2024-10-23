
const express = require('express')
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = 3000

dotenv.config()

app.use(bodyParser.json())
app.use(cors())

// Connection URL
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

// Database Name
const dbName = 'passOP';
client.connect();

app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('password');
    const findResult = await collection.find({}).toArray()
    res.send(findResult)
})

app.post('/', async (req, res) => {
    let password = req.body
    const db = client.db(dbName);
    const collection = db.collection('password');
    const findResult = await collection.insertOne(password)
    res.send({success: true, result: findResult})
})

app.delete('/', async (req, res) => {
    let password = req.body
    const db = client.db(dbName);
    const collection = db.collection('password');
    const findResult = collection.deleteOne(password)
    res.send({success: true, result: findResult})
})

app.patch('/', async (req, res) => {
    let { editid, site, username, password } = req.body;
    const db = client.db(dbName);
    const collection = db.collection('password');
    const findResult = await collection.updateOne(
        { id: editid }, // Find the document by id
        { $set: { site, username, password } } // Update fields
    );
    res.send({ success: true, result: findResult });
});


app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})