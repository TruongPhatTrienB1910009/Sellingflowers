const express = require('express');
const Router = express.Router();
const productController = require('../controllers/product.controller');

Router.route('/')
    .get(productController.getAllProducts)

Router.route('/:id')
    .get(productController.getProductById)
    .post(productController.getAllReviewByProductId)

Router.route('/sort')
    .post(productController.sortProducts)

Router.route('/filter')
    .post(productController.filterProducts)

Router.route('/categories/:categoryid')
    .get(productController.getAllProductsByCategory)


module.exports = Router;