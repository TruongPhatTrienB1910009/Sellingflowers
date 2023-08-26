const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account.controller')

router.route("/")
    .get(accountController.getAccount)
    .post(accountController.signUp);

    
module.exports = router;