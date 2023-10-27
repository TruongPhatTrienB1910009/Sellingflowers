import express from 'express';
const Router = express.Router();
const billController = require("../controllers/bill.controller");

Router.route('/:id')
    .get(billController.getBillById)

module.exports = Router;