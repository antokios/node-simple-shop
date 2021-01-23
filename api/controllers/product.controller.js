// import Product Model
const  Product = require("../models/product.model");

// DEFINE CONTROLLER FUNCTIONS

// listAllProducts function - To list all products
exports.listAllProducts = (req, res) => {
    Product.find({}, (err, product) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(product);
    });
};

// createNewProduct function - To create new product
exports.createNewProduct = (req, res) => {
    let  newProduct = new Product (req.body);
    newProduct.save((err, product) => {
        if (err) {
            res.status(500).send(err);
        }
    res.status(201).json(product);
    });
};


// updateProduct function - To update product info by id
exports.updateProduct = (req, res) => {
    Product.findOneAndUpdate({ _id:req.params.id }, req.body, { new:true }, (err, product) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(product);
    });
};
    
// deleteProduct function - To delete product by id
    exports.deleteProduct = async ( req, res) => {
    await  Product.deleteOne({ _id:req.params.id }, (err) => {
        if (err) {
            return res.status(404).send(err);
        }
        res.status(200).json({ message:"Product successfully deleted"});
    });
};