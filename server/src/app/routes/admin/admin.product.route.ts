import express from 'express';
const router = express.Router();
const adminProductController = require("../../controllers/admin/admin.product.controller");

router.route("/")
    .post(adminProductController.upload, adminProductController.createProduct)


router.route("/supplier")
    .get(adminProductController.getAllSuppliers)
    .post(adminProductController.createSupplier)

module.exports = router;