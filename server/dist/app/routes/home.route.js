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
    .get(homeController.signIn);
module.exports = router;
