'use strict'

// import Order Model
const Order = require("../models/order.model");

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
    const newOrder = new Order(req.body);
    newOrder.save((err, order) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(201).json(order);
    });
};
