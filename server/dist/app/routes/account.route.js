"use strict";
const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account.controller');
router.route("/profile")
    .get(accountController.getAccount);
router.route("/signup")
    .post(accountController.signUp);
router.route("/signin")
    .get(accountController.signIn);
module.exports = router;
