import express from 'express';
const router = express.Router();
const adminProductController = require("../../controllers/admin/admin.product.controller");
const adminCategoriesController = require("../../controllers/admin/admin.cateGories.controller");

router.route("/")
    .post(adminProductController.upload, adminProductController.createProduct)


router.route("/supplier")
    .get(adminProductController.getAllSuppliers)
    .post(adminProductController.createSupplier)

router.route("/supplier/:id")
    .get(adminProductController.getSupplierById)


router.route("/categories")
    .get(adminCategoriesController.getAllCategories)

router.route("/categories/typeproducts")
    .get(adminCategoriesController.getAllTypeProducts)
    .post(adminCategoriesController.createNewTypeProducts)

module.exports = router;