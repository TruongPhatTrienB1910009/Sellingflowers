import express from 'express';
const router = express.Router();

const adminDashboardController = require("../../controllers/admin/admin.dashboard.controller");

router.route("/statistical")
    .get(adminDashboardController.costStatistics)

module.exports = router;