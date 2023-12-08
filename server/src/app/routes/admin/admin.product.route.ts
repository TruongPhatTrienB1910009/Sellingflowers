import express from 'express';
const router = express.Router();
const adminProductController = require("../../controllers/admin/admin.product.controller");
const adminCategoriesController = require("../../controllers/admin/admin.categories.controller");

router.route("/")
    .post(adminProductController.upload, adminProductController.createProduct)

router.route("/:id")
    .patch(adminProductController.upload, adminProductController.updateProduct)
    .delete(adminProductController.deleteProduct)

router.route("/importbill")
    .post(adminProductController.createImportBillMultipleProducts)

router.route("/supplier")
    .get(adminProductController.getAllSuppliers)
    .post(adminProductController.createSupplier)

router.route("/supplier/:id")
    .patch(adminProductController.upload, adminProductController.updateSupplier)
    .get(adminProductController.getSupplierById)
    .delete(adminProductController.deleteSupplier)


router.route("/categories")
    .post(adminCategoriesController.createNewCategory)

router.route("/categories/:id")
    .get(adminCategoriesController.getCategory)
    .patch(adminCategoriesController.updateCategory)
    .delete(adminCategoriesController.deleteCategory)

router.route("/categories/typecategories")
    .post(adminCategoriesController.createNewTypeCategories)

router.route("/categories/typecategories/:id")
    .get(adminCategoriesController.getTypeCategory)
    .patch(adminCategoriesController.updateTypeCategory)
    .delete(adminCategoriesController.deleteTypeCategory)

module.exports = router;