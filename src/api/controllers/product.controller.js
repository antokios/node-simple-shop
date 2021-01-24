'use strict'

// require validator for string validation
const validator = require('validator');
// import Product Model
const Product = require("../models/product.model");

// DEFINE CONTROLLER FUNCTIONS

// listAllProducts function - To list all products
exports.listAllProducts = (req, res) => {
    Product.find({}, (err, products) => {
        if (err) {
            return res.status(500).send(`Internal server error: ${error}`);
        }

        if (products && products.length === 0) {
            return res.status(404).send(`No products found!`);
        }

        return res.status(200).json(products);
    });
};

// createNewProduct function - To create new product
exports.createNewProduct = (req, res) => {
    const name = req.body?.name?.trim();
    const price = req.body?.price;
    const description = req.body?.description?.trim();
    const imageUrl = req.body?.imageUrl?.trim();
    const stockQty = req.body?.stockQty;

    if (!name || !price || !description || !imageUrl || !stockQty) {
        return res.status(400).send(`Incomplete product information`);
    }

    if (!typeof price === 'number' || price <= 0) {
        return res.status(400).send(`Invalid price`);
    }

    if (!validator.isURL(imageUrl)) {
        return res.status(400).send(`Invalid URL`);
    }

    if (!typeof stockQty === 'number' || stockQty <= 0) {
        return res.status(400).send(`Invalid stock quantity`);
    }

    const newProduct = new Product({ name, price, description, imageUrl, stockQty });

    newProduct.save((err, product) => {
        if (err) {
            return res.status(500).send(`Internal server error: ${err}`);
        }
        return res.status(201).json(product);
    });
};


// updateProduct function - To update product info by id
exports.updateProduct = (req, res) => {
    const name = req.body?.name?.trim();
    const price = req.body?.price;
    const description = req.body?.description?.trim();
    const imageUrl = req.body?.imageUrl?.trim();
    const stockQty = req.body?.stockQty;
    const mongoId = req?.params?.id;

    if (!validator.isMongoId(mongoId)) {
        return res.status(400).send('Invalid Id');
    }

    if (!name || !price || !description || !imageUrl || !stockQty) {
        return res.status(400).send(`Incomplete product information`);
    }

    if (!typeof price === 'number' || price <= 0) {
        return res.status(400).send(`Invalid price`);
    }

    if (!validator.isURL(imageUrl)) {
        return res.status(400).send(`Invalid URL`);
    }

    if (!typeof stockQty === 'number' || stockQty <= 0) {
        return res.status(400).send(`Invalid stock quantity`);
    }

    Product.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, product) => {
        if (err) {
            return res.status(500).send(`Internal server error: ${err}`);
        }

        if (!product) {
            return res.status(404).send(`No product found to edit`);
        }

        return res.status(200).json(product);
    });
};

// deleteProduct function - To delete product by id
exports.deleteProduct = (req, res) => {
    const mongoId = req?.params?.id;

    if (!validator.isMongoId(mongoId)) {
        return res.status(400).send('Invalid Id');
    }

    Product.deleteOne({ _id: req.params.id }, (err, product) => {
        if (err) {
            return res.status(404).send(`Internal server error: ${err}`);
        }

        if (product?.deletedCount === 0) {
            return res.status(404).send('No product found to delete');
        }

        return res.status(200).send('Product deleted successfully');
    });
};