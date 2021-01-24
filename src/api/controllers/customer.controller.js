'use strict'

// require validator for string validation
const validator = require('validator');
// import Customer Model
const Customer = require("../models/customer.model");

// DEFINE CONTROLLER FUNCTIONS

// listAllCustomers function - To list all customers
exports.listAllCustomers = (req, res) => {
    Customer.find({}, (err, customers) => {
        if (err) {
            return res.status(500).send(`Internal server error: ${error}`);
        }

        if (customers && customers.length === 0) {
            return res.status(404).send(`No customers found!`);
        }

        return res.status(200).json(customers);
    });
};

// createNewCustomer function - To create new customer
exports.createNewCustomer = (req, res) => {
    const email = req.body?.email?.trim();
    const firstName = req.body?.firstName?.trim();
    const lastName = req.body?.lastName?.trim();

    if (!email || !firstName || !lastName) {
        return res.status(400).send(`Incomplete customer information`);
    }

    if (!validator.isEmail(email)) {
        return res.status(400).send(`Invalid email`);
    }

    const newCustomer = new Customer({ email, firstName, lastName });

    newCustomer.save((err, customer) => {
        if (err) {
            return res.status(500).send(`Internal server error: ${err}`);
        }
        return res.status(201).json(customer);
    });
};


// updateCustomer function - To update customer info by id
exports.updateCustomer = (req, res) => {
    const email = req.body?.email?.trim();
    const firstName = req.body?.firstName?.trim();
    const lastName = req.body?.lastName?.trim();
    const mongoId = req?.params?.id;

    if (!validator.isMongoId(mongoId)) {
        return res.status(400).send('Invalid Id');
    }

    if (!email || !firstName || !lastName) {
        return res.status(400).send(`Incomplete customer information`);
    }

    if (!validator.isEmail(email)) {
        return res.status(400).send(`Invalid email`);
    }

    Customer.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, customer) => {
        if (err) {
            return res.status(500).send(`Internal server error: ${err}`);
        }

        if (!customer) {
            return res.status(404).send(`No customer found to edit`);
        }

        return res.status(200).json(customer);
    });
};

// deleteCustomer function - To delete customer by id
exports.deleteCustomer = (req, res) => {
    const mongoId = req?.params?.id;

    if (!validator.isMongoId(mongoId)) {
        return res.status(400).send('Invalid Id');
    }

    Customer.deleteOne({ _id: mongoId }, (err, customer) => {
        if (err) {
            return res.status(500).send(`Internal server error: ${err}`);
        }

        if (customer?.deletedCount === 0) {
            return res.status(404).send('No customer found to delete');
        }

        return res.status(200).send('Customer deleted successfully');
    });
};