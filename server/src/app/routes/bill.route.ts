import express from 'express';
const Router = express.Router();
const billController = require("../controllers/bill.controller");

Router.route('/bill')
    // .patch(billController.updateTotalItems)

module.exports = Router;