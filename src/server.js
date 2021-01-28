'use strict'

// require express and bodyParser
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression')
var path = require('path');

// create express app
const app = express();

// define port to run express app
const port = process.env.PORT || 4000;

// use bodyParser middleware on express app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Allow CORS (Cross-origin resource sharing) requests
app.use(cors());

// Use helmet for securing requests
app.use(helmet());

// Compress all responses with gzip
app.use(compression());

// Add endpoint
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/api/routes/home.route.html'));
});

// Import DB Connection
require("./config/db.config");

// Import API routes
const customerRoutes = require('./api/routes/customer.routes'); //importing /customers routes
customerRoutes(app);

const productRoutes = require('./api/routes/product.routes'); //importing /products routes
productRoutes(app);

const orderRoutes = require('./api/routes/order.routes'); //importing /orders routes
orderRoutes(app);

// Listen to server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});