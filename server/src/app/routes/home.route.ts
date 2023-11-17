import express from 'express';
const router = express.Router();
const homeController = require('../controllers/home.controller')

router.route("/signup")
    .post(homeController.signUp);

router.route("/signin")
    .post(homeController.signIn);

router.route("/checkuser")
    .post(homeController.checkUserByToken);

router.route("/categories")
    .get(homeController.getAllCategories)

router.route("/categories/typecategories")
    .get(homeController.getAllTypeCategories)

router.route("/forgotpassword")
    .post(homeController.requireForgotPassword)

router.route("/resetpassword")
    .post(homeController.resetPassword)

module.exports = router;