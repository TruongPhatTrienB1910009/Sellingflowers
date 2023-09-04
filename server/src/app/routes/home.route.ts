import express from 'express';
const router = express.Router();
const homeController = require('../controllers/home.controller')

router.route("/signup")
    .post(homeController.signUp);

router.route("/signin")
    .get(homeController.signIn);

    
module.exports = router;