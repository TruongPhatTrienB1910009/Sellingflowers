import express from 'express';
const router = express.Router();
const receiptsController = require("../../controllers/admin/admin.receipts.controller");


router.route("/")
    .get(receiptsController.getAllReceipts)

module.exports = router