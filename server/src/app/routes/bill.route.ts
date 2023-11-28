import express from 'express';
const Router = express.Router();
const billController = require("../controllers/bill.controller");

Router.route('/:id')
    .get(billController.getBillById)
    .patch(billController.cancelBill)

module.exports = Router;