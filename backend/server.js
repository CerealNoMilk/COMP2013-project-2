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

//to POST data to products collection
server.post("/products", async (request, response) => {
    

    const{ id, productName, brand, quantity, image, price } = request.body
    const newProduct = new Product({
        id,
        productName,
        brand,
        quantity,
        image,
        price,
    });
    try{
        await newProduct.save();
        console.log("New product added:", newProduct);
        response.status(200).send({ message: "Product added successfully"});
    }catch(error){
        console.log("Error adding product:", error.message);
        response.status(400).send({ message: error.message });
    }
});

//to DELETE a product by id
server.delete("/products/:id", async (request, response) => {
    const { id } = request.params;
    try{
        const deletedProduct = await Product.findOneAndDelete({ id: id });
        if(deletedProduct){
            console.log("Deleted product:", deletedProduct);
            response.status(200).send({ message: "Product deleted successfully"});
        }
    }catch(error){
        response.status(400).send({ message: error.message });
    }
});

//to UPDATE a product by id
server.put("/products/:id", async (request, response) => {
    const { id } = request.params;
    const { productName, brand, quantity, image, price } = request.body;
    try{
        const updatedProduct = await Product.findOneAndUpdate(
            { id: id },
            { productName, brand, quantity, image, price },
            { new: true }
        );
        if(updatedProduct){
            console.log("Updated product:", updatedProduct);
            response.status(200).send({ message: "Product updated successfully"});
        }
    }catch(error){
        response.status(400).send({ message: error.message });
    }
});