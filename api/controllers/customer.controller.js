// import Customer Model
const  Customer = require("../models/customer.model");

// DEFINE CONTROLLER FUNCTIONS

// listAllCustomers function - To list all customers
exports.listAllCustomers = (req, res) => {
    Customer.find({}, (err, customer) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(customer);
    });
};

// createNewCustomer function - To create new customer
exports.createNewCustomer = (req, res) => {
    let  newCustomer = new Customer (req.body);
    newCustomer.save((err, customer) => {
        if (err) {
            res.status(500).send(err);
        }
    res.status(201).json(customer);
    });
};


// updateCustomer function - To update customer info by id
exports.updateCustomer = (req, res) => {
    Customer.findOneAndUpdate({ _id:req.params.id }, req.body, { new:true }, (err, customer) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(customer);
    });
};
    
// deleteCustomer function - To delete customer by id
    exports.deleteCustomer = async ( req, res) => {
    await  Customer.deleteOne({ _id:req.params.id }, (err) => {
        if (err) {
            return res.status(404).send(err);
        }
        res.status(200).json({ message:"Customer successfully deleted"});
    });
};