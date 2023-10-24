"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const adminProductController = require("../../controllers/admin/admin.product.controller");
router.route("/")
    .post(adminProductController.upload, adminProductController.createProduct);
router.route("/supplier")
    .get(adminProductController.getAllSuppliers)
    .post(adminProductController.createSupplier);
router.route("/supplier/:id")
    .get(adminProductController.getSupplierById);
module.exports = router;
