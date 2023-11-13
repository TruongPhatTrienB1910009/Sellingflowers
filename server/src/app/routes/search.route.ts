import express from 'express';
const router = express.Router();
const searchController = require("../controllers/searchimage.controller")

router.route("/store")
    .post(searchController.uploadSearch, searchController.getPathImage)

router.route("/deleteall")
    .post(searchController.deleteAllFiles)

router.route("/delete")
    .post(searchController.deleteByPath)


module.exports = router