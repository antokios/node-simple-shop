'use strict';

// create App function
    module.exports = function(app) {
        var productList = require('../controllers/product.controller');

// productList Routes

// get and post request for /products endpoints
    app
    .route("/products")
    .get(productList.listAllProducts)
    .post(productList.createNewProduct);

// put and delete request for /products endpoints
    app
    .route("/products/:id")
    .put(productList.updateProduct)
    .delete(productList.deleteProduct);

};