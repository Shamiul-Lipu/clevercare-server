const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lvuf5o9.mongodb.net/?retryWrites=true&w=majority`;

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

        const toyesCollection = client.db('cleverCareDB').collection('toys');
        const coursesCollection = client.db('cleverCareDB').collection('courses');

        const indexkeys = { toy_name: 1 };
        const indexOptions = { name: "toyName" };
        const result = await toyesCollection.createIndex(indexkeys, indexOptions);

        app.get('/all_toy_data/:text', async (req, res) => {
            const searchText = req.params.text;
            const cursor = req.body;
            const limit = parseInt(req.query.limit) || 20;
            // console.log("1", req.query);
            const result = await toyesCollection.find({
                $or: [{ toy_name: { $regex: searchText, $options: "i" } }]
            }).limit(limit).toArray();
            res.send(result)
        })

        // get all data with limit
        app.get('/all_toy_data', async (req, res) => {
            const cursor = req.body;
            const limit = parseInt(req.query.limit) || 20;
            let setPrice;
            const value = req.query.value || 'high';
            if (value === 'high') {
                setPrice = -1;
                // console.log(1)
            } else {
                setPrice = 1;
                // console.log(-1)
            }
            // console.log("2line", req.query.value);
            // console.log(setPrice);

            const result = await toyesCollection.find().sort({ price: setPrice }).limit(limit).toArray();
            res.send(result);
        })

        // for category
        app.get('/all_toy', async (req, res) => {
            let query = {};
            if (req.query?.categoryName) {
                query = { categoryName: req.query.categoryName }
            }
            const result = await toyesCollection.find(query).limit(12).toArray();
            res.send(result);
        })

        // Insert data
        app.post('/postToy', async (req, res) => {
            const body = req.body;
            const result = await toyesCollection.insertOne(body);
            res.send(result);
        })

        // User's inserted toyes
        app.get('/users_inserted_toy', async (req, res) => {
            let query = {};
            if (req.query?.seller_email) {
                query = { seller_email: req.query.seller_email }
            }
            const result = await toyesCollection.find(query).toArray();
            res.send(result);
        })

        app.get('/toy/:id', async (req, res) => {
            const id = req.params.id
            const filter = { _id: new ObjectId(id) }
            const data = await toyesCollection.findOne(filter)
            res.send(data)
        })

        // Update User's toy
        app.patch('/update/:id', async (req, res) => {
            const id = req.params.id;
            const updateToys = req.body;
            const filter = { _id: new ObjectId(id) };
            // console.log(updateToys)
            const updateDoc = {
                $set: {
                    ...updateToys
                }
            }
            const result = await toyesCollection.updateOne(filter, updateDoc);
            res.send(result);
        })

        // Delete toy
        app.delete('/update/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await toyesCollection.deleteOne(filter);
            res.send(result);
        })

        // get courses
        app.get('/courses', async (req, res) => {
            const details = req.body;
            const result = await coursesCollection.find().toArray();
            res.send(result);
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('CleverCare is running');
})

app.listen(port, () => {
    console.log(`CleverCare Server is running on port ${port}`)
})