import express from 'express';
const router = express.Router();
const accountController = require('../controllers/account.controller')

router.route("/profile")
    .get(accountController.getAccount)
    .patch(accountController.updateAccount)
    
module.exports = router;