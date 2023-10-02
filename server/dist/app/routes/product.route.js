"use strict";
const express = require('express');
const Router = express.Router();
const productController = require('../controllers/product.controller');
Router.route('/')
    .get(productController.getAllProducts)
    .post(productController.upload, productController.createProduct);
Router.route('/:id')
    .get(productController.getProductById);
module.exports = Router;
