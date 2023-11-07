"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db = require('./app/models');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const { checkUserJWT } = require('./app/middlewares/authenticate');
const { checkAdmin } = require('./app/middlewares/authAdmin');
// import router
const accountRoute = require('./app/routes/account.route');
const homeRoute = require('./app/routes/home.route');
const productRoute = require('./app/routes/product.route');
const cartRoute = require('./app/routes/cart.route');
const billRoute = require('./app/routes/bill.route');
const checkoutRoute = require('./app/routes/checkout.route');
// router admin
const adminProductRoute = require('./app/routes/admin/admin.product.route');
const adminUserRoute = require('./app/routes/admin/admin.user.route');
const adminReceiptRoute = require('./app/routes/admin/admin.receipt.route');
const adminDashboardRoute = require('./app/routes/admin/admin.dashboard.route');
const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;
// handel router
app.use('/', homeRoute);
app.use('/account', checkUserJWT, accountRoute);
app.use('/products', productRoute);
app.use('/cart', checkUserJWT, cartRoute);
app.use('/bill', checkUserJWT, billRoute);
app.use('/checkout', checkUserJWT, checkoutRoute);
// handle router admin
app.use('/admin/products', checkUserJWT, checkAdmin, adminProductRoute);
app.use('/admin/users', checkUserJWT, checkAdmin, adminUserRoute);
app.use('/admin/receipts', checkUserJWT, checkAdmin, adminReceiptRoute);
app.use('/admin/dashboard', checkUserJWT, checkAdmin, adminDashboardRoute);
const runServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db.sequelize.sync();
        db.sequelize.authenticate();
        console.log("Connected to Database");
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
runServer();
