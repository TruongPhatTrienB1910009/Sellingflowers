import express from 'express';
const router = express.Router();
const discountController = require('../../controllers/admin/admin.discounts.controller');

router.route('/')
    .get(discountController.getAllDiscounts)
    .post(discountController.createDiscount)

router.route('/:id')
    .delete(discountController.deleteDiscount)

module.exports = router;