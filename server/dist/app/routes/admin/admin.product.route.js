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
router.route("/:id")
    .patch(adminProductController.upload, adminProductController.updateProduct)
    .delete(adminProductController.deleteProduct);
router.route("/importbill")
    .post(adminProductController.createImportBillMultipleProducts);
router.route("/supplier")
    .get(adminProductController.getAllSuppliers)
    .post(adminProductController.createSupplier);
router.route("/supplier/:id")
    .patch(adminProductController.upload, adminProductController.updateSupplier)
    .get(adminProductController.getSupplierById);
router.route("/categories")
    .post(adminCategoriesController.createNewCategory);
router.route("/categories/:id")
    .delete(adminCategoriesController.deleteCategory);
router.route("/categories/typecategories")
    .post(adminCategoriesController.createNewTypeCategories);
module.exports = router;
