"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const discountsController = require('../controllers/discount.controller');
router.route('/')
    .get(discountsController.getExisDiscounts);
router.route('/:id')
    .get(discountsController.getDiscountById)
    .delete(discountsController.deleteDiscountById);
module.exports = router;
