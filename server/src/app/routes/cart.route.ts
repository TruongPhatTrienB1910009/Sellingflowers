import express from 'express';
const router = express.Router();
const cartController = require('../controllers/cart.controller')

router.route("/")
    .post(cartController.addToCart);

    
module.exports = router;