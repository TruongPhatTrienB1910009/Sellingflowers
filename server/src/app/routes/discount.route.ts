import express from 'express';
const router = express.Router();
const discountsController = require('../controllers/discount.controller');

router.route('/')
    .get(discountsController.getExisDiscounts)

router.route('/:id')
    .get(discountsController.getDiscountById)
    .delete(discountsController.deleteDiscountById);

module.exports = router;