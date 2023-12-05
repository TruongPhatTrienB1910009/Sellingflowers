import express from 'express';
const router = express.Router();
const discountsController = require('../controllers/discount.controller');

router.route('/')
    .get(discountsController.getExisDiscounts)

module.exports = router;