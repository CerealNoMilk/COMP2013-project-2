//Initializing the server
const express = require("express");
const server = express();
const port = 3000;
const mongoose = require ("mongoose");//import mongoose
require("dotenv").config(); //import dotenv
const { DB_URI } = process.env; //grab variable form dotenv file
console.log("DB_URI from .env:", DB_URI);
const cors = require("cors"); //for disabling default broweser security
const Product = require ("./models/products"); //importing the model schema

//Middleware
server.use(express.json()); //to show data is transmitted as json
server.use(express.urlencoded({ extended: true })); //to show data is encoded and decoded while transmitting
server.use(cors());

// Database connection and server listening
mongoose.connect(DB_URI).then(() => {
    server.listen(port, () => {
        console.log(`Database is connected\nServer is listening on ${port}`);
    });
})
.catch((error) => console.log(error.message));

//Routes
//Root route
server.get("/", (request, response) => {
    response.send("Server is live!");
});

//to GET all the data from products collection
server.get("/products", async (request, response) => {
    try{
        const products = await Product.find();
        response.send(products);
    }catch(error){
        response.status(500).send({ message: error.message });
    }
});