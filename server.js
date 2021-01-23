'use strict'

// require express and bodyParser
const  express = require("express");
const  bodyParser = require("body-parser");

// create express app
const  app = express();

// define port to run express app
const  port = process.env.PORT || 3000;

// use bodyParser middleware on express app
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

// Add endpoint
app.get('/', (req, res) => {
    res.send("Welcome to Tony's Shop default endpoint");
});

// Import DB Connection
require("./config/db.config");

// Import API routes
var customerRoutes = require('./api/routes/customer.routes'); //importing /customers routes
customerRoutes(app);

var productRoutes = require('./api/routes/product.routes'); //importing /products routes
productRoutes(app);

var orderRoutes = require('./api/routes/order.routes'); //importing /orders routes
orderRoutes(app);

// Listen to server
app.listen(port, () => {

console.log(`Server running at http://localhost:${port}`);
});