"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const accountController = require('../controllers/account.controller');
router.route("/profile")
    .get(accountController.getAccount)
    .patch(accountController.updateAccount);
router.route("/address")
    .get(accountController.getAllAddress)
    .post(accountController.createDeliveryAddress);
router.route("/address/:id")
    .get(accountController.getDetailAddress)
    .patch(accountController.updateDeliveryAddress)
    .delete(accountController.deleteDeliveryAddress);
router.route("/receipts/:type")
    .get(accountController.getAllBillByType);
router.route("/product/review")
    .post(accountController.reviewProduct);
// router.route("/product/review/:id")
module.exports = router;
