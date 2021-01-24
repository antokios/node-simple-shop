'use strict';

// Import mongoose
const mongoose = require("mongoose");

// Declare schema and assign Schema class
const Schema = mongoose.Schema;

// Create Schema Instance and add schema propertise
const OrderSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Products"
    },
    quantity: {
        type: Number,
        default: 1
    },
    customerId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Customers"
    }
});

// create and export model
module.exports = mongoose.model("Orders", OrderSchema);