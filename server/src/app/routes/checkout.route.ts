import express from 'express';
const router = express.Router();
const checkoutController = require('../controllers/checkout.controller');


router.route('/')
    .post(checkoutController.checkOut)


module.exports = router;