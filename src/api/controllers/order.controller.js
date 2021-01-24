'use strict'

// import Order Model
const Order = require("../models/order.model");

// DEFINE CONTROLLER FUNCTIONS

// listAllOrders function - To list all orders
exports.listAllOrders = (req, res) => {
    Order.find({}, (err, order) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(order);
    });
};

// createNewOrder function - To create new order
exports.createNewOrder = (req, res) => {
    let newOrder = new Order(req.body);
    newOrder.save((err, order) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(201).json(order);
    });
};
