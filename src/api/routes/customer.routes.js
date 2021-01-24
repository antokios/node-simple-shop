'use strict';

// create App function
module.exports = function (app) {
    const customerList = require('../controllers/customer.controller');

    // customerList Routes

    // get and post request for /customers endpoints
    app
        .route("/customers")
        .get(customerList.listAllCustomers)
        .post(customerList.createNewCustomer);

    // put and delete request for /customers endpoints
    app
        .route("/customers/:id")
        .put(customerList.updateCustomer)
        .delete(customerList.deleteCustomer);
};