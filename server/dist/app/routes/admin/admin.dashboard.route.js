"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const adminDashboardController = require("../../controllers/admin/admin.dashboard.controller");
router.route("/statistical")
    .get(adminDashboardController.costStatistics);
router.route("/today")
    .get(adminDashboardController.getAllBillToday);
module.exports = router;
