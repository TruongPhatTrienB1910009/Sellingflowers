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

router.route("/receipts/")
    .get(accountController.getAllBillWaitting)
    
module.exports = router;