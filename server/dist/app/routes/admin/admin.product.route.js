"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const adminProductController = require("../../controllers/admin/admin.product.controller");
const adminCategoriesController = require("../../controllers/admin/admin.categories.controller");
router.route("/")
    .post(adminProductController.upload, adminProductController.createProduct);
router.route("/supplier")
    .get(adminProductController.getAllSuppliers)
    .post(adminProductController.createSupplier);
router.route("/supplier/:id")
    .get(adminProductController.getSupplierById);
router.route("/categories")
    .get(adminCategoriesController.getAllCategories)
    .post(adminCategoriesController.createNewCategory);
router.route("/categories/typecategories")
    .get(adminCategoriesController.getAllTypeCategories)
    .post(adminCategoriesController.createNewTypeCategories);
module.exports = router;
