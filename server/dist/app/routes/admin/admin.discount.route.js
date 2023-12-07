"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const discountController = require('../../controllers/admin/admin.discounts.controller');
router.route('/')
    .get(discountController.getAllDiscounts)
    .post(discountController.createDiscount);
router.route('/:id')
    .delete(discountController.deleteDiscount);
module.exports = router;
