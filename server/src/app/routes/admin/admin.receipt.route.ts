import express from 'express';
const router = express.Router();
const receiptsController = require("../../controllers/admin/admin.receipts.controller");


router.route("/")
    .get(receiptsController.getAllReceipts)

router.route("/status/:id")
    .post(receiptsController.confirmReceipt)

module.exports = router