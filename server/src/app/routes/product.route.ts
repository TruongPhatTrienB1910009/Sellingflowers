const express = require('express');
const Router = express.Router();
const productController = require('../controllers/product.controller');

Router.route('/')
    .post(productController.upload, productController.createProduct)

module.exports = Router;