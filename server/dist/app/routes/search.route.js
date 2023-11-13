"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const searchController = require("../controllers/searchimage.controller");
router.route("/store")
    .post(searchController.uploadSearch, searchController.getPathImage);
router.route("/deleteall")
    .post(searchController.deleteAllFiles);
router.route("/delete")
    .post(searchController.deleteByPath);
module.exports = router;
