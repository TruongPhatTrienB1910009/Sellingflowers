import express from 'express';
const router = express.Router();
const discountController = require('../../controllers/admin/admin.discounts.controller');

router.route('/')
    .post(discountController.createDiscount)

module.exports = router;