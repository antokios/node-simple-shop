'use strict'

// require validator for string validation
const validator = require('validator');
// import Order, Customer, Product Models
const Order = require("../models/order.model");
const Customer = require("../models/customer.model");
const Product = require("../models/product.model");

// DEFINE CONTROLLER FUNCTIONS

// listAllOrders function - To list all orders
exports.listAllOrders = (req, res) => {
    Order.find({}, (err, orders) => {
        if (err) {
            return res.status(500).send(`Internal server error: ${error}`);
        }

        if (orders && orders.length === 0) {
            return res.status(404).send(`No orders found!`);
        }

        return res.status(200).json(orders);
    });
};

// createNewOrder function - To create new order
exports.createNewOrder = (req, res) => {
    const customerId = req.body?.customerId;
    const productsArray = req.body?.products;

    let productsToUpdateInDbArray = [];

    if (!validator.isMongoId(customerId)) {
        return res.status(400).send('Invalid customer Id');
    }

    Customer.findById(customerId, async (err, customer) => {
        if (err) {
            return res.status(500).send(`Internal server error: ${error}`);
        }

        if (!customer) {
            return res.status(404).send(`No customers found!`);
        }

        if (!productsArray || productsArray.length === 0) {
            return res.status(400).send(`No products found in the order!`);
        }

        for (let product of productsArray) {
            if (!validator.isMongoId(product?.productId)) {
                return res.status(400).send('Invalid product Id');
            }

            if (!product?.quantity || product?.quantity < 1) {
                return res.status(400).send('Invalid product quantity');
            }

            let productFound = await Product.findById(product?.productId).exec();
            
            if (!productFound) {
                return res.status(404).send('Product not found!');
            }

            if (productFound.stockQty < product.quantity) {
                return res.status(400).send('Not enough product quantity in stock')
            }

            productFound.stockQty -= product.quantity;
            productsToUpdateInDbArray.push(productFound);
        }

        const newOrder = new Order(req.body);
        newOrder.save(async (err, order) => {
            if (err) {
                return res.status(500).send(`Internal server error: ${error}`);
            }

            for (let item of productsToUpdateInDbArray) {
                const filter = { _id: item._id };
                const update = { stockQty: item.stockQty };

                await Product.findOneAndUpdate( filter, update, { new: true } );
            }
            return res.status(201).json(order);
        });
    });
};
