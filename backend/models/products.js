// Initialze the model schema
const mongoose = require("mongoose");
const schema = mongoose.Schema;

//create the product model schema
const productSchema = new schema({
    id: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    price: {
        type: String,
        required: true,
    },
});
//package and export the model
const Product = mongoose.model("Product", productSchema, "Products");
module.exports = Product;

