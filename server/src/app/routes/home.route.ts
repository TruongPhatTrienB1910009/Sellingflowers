import express from 'express';
const router = express.Router();
const homeController = require('../controllers/home.controller')

router.route("/signup")
    .post(homeController.signUp);

router.route("/signin")
    .post(homeController.signIn);

router.route("/checkuser")
    .post(homeController.checkUserByToken);
    
module.exports = router;