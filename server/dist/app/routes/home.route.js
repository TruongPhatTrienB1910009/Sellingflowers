"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const homeController = require('../controllers/home.controller');
router.route("/signup")
    .post(homeController.signUp);
router.route("/signin")
    .post(homeController.signIn);
router.route("/checkuser")
    .post(homeController.checkUserByToken);
router.route("/categories")
    .get(homeController.getAllCategories);
router.route("/categories/typecategories")
    .get(homeController.getAllTypeCategories);
module.exports = router;
