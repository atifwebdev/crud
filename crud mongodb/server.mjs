import express from "express";
import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('1234567890', 20);
import { MongoClient } from "mongodb";

import './config/index.mjs';

const mongodbURI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.1aqvjbu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(mongodbURI);
const database = client.db('crudpractice');
const productsCollection = database.collection('products');

const app = express();
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello by Atif");
});


// Post to mongodb
app.post("/product", async (req, res) => {

    // {
    //   id: 212342, // always a number
    //   name: "abc product",
    //   price: "$23.12",
    //   description: "abc product description"
    // }

    if (!req.body.name
      || !req.body.price
      || !req.body.description) {
  
      res.status(403).send(`
        required parameter missing. example JSON request body:
        {
          name: "abc product",
          price: "$23.12",
          description: "abc product description"
        }`);
    }
  
    const doc = {
      id: nanoid(),
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
    }
    const result = await productsCollection.insertOne(doc);
  
    res.status(201).send({ message: "created product" });
  });

  


// port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});