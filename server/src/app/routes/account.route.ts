import express from 'express';
const router = express.Router();
const accountController = require('../controllers/account.controller')

router.route("/profile")
    .get(accountController.getAccount)
    .patch(accountController.updateAccount)

router.route("/address")
    .get(accountController.getAllAddress)
    .post(accountController.createDeliveryAddress)

router.route("/address/:id")
    .get(accountController.getDetailAddress)
    .patch(accountController.updateDeliveryAddress)
    .delete(accountController.deleteDeliveryAddress)

router.route("/receipts/:type")
    .get(accountController.getAllBillByType)

router.route("/product/review")
    .post(accountController.reviewProduct)

router.route("/product/review/:id")
    .delete(accountController.deleteComment)
    
module.exports = router;