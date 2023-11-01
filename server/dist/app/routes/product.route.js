"use strict";
const express = require('express');
const Router = express.Router();
const productController = require('../controllers/product.controller');
Router.route('/')
    .get(productController.getAllProducts);
Router.route('/:id')
    .get(productController.getProductById);
Router.route('/sort')
    .post(productController.sortProducts);
module.exports = Router;
