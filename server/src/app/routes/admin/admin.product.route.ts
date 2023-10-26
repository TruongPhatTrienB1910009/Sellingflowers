import express from 'express';
const router = express.Router();
const adminProductController = require("../../controllers/admin/admin.product.controller");
const adminCategoriesController = require("../../controllers/admin/admin.categories.controller");

router.route("/")
    .post(adminProductController.upload, adminProductController.createProduct)

router.route("/importbill")
    .post(adminProductController.createImportBillMultipleProducts)

router.route("/supplier")
    .get(adminProductController.getAllSuppliers)
    .post(adminProductController.createSupplier)

router.route("/supplier/:id")
    .get(adminProductController.getSupplierById)


router.route("/categories")
    .get(adminCategoriesController.getAllCategories)
    .post(adminCategoriesController.createNewCategory)

router.route("/categories/:id")
    .delete(adminCategoriesController.deleteCategory)

router.route("/categories/typecategories")
    .get(adminCategoriesController.getAllTypeCategories)
    .post(adminCategoriesController.createNewTypeCategories)

module.exports = router;