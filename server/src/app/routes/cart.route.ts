import express from 'express';
const router = express.Router();
const cartController = require('../controllers/cart.controller')

router.route("/")
    .get(cartController.getAllItemsInCart)
    .post(cartController.addToCart)
    .patch(cartController.updateTotalItems)
    .delete(cartController.removeItemFromCart)
    
module.exports = router;