'use strict';

// create App function
module.exports = function (app) {
    const orderList = require('../controllers/order.controller');

    // orderList Routes

    // get and post request for /orders endpoints
    app
        .route("/orders")
        .get(orderList.listAllOrders)
        .post(orderList.createNewOrder);
};