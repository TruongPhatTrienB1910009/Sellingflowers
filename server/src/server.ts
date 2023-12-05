import { Request, Response, NextFunction } from 'express';
const db = require('./app/models');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const { checkUserJWT } = require('./app/middlewares/authenticate')
const { checkAdmin } = require('./app/middlewares/authAdmin')

// import router
const accountRoute = require('./app/routes/account.route');
const homeRoute = require('./app/routes/home.route');
const productRoute = require('./app/routes/product.route');
const cartRoute = require('./app/routes/cart.route');
const billRoute = require('./app/routes/bill.route');
const checkoutRoute = require('./app/routes/checkout.route');
const searchRoute = require('./app/routes/search.route');
const discountRoute = require('./app/routes/discount.route');

// router admin
const adminProductRoute = require('./app/routes/admin/admin.product.route');
const adminUserRoute = require('./app/routes/admin/admin.user.route');
const adminReceiptRoute = require('./app/routes/admin/admin.receipt.route');
const adminDashboardRoute = require('./app/routes/admin/admin.dashboard.route');
const adminDiscountRoute = require('./app/routes/admin/admin.discount.route');

const app = express();
app.use(express.json());
app.use(cors());

const port = 3000;


// handel router
app.use('/', homeRoute);
app.use('/discounts', discountRoute);
app.use('/search', searchRoute);
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
app.use('/admin/discounts', checkUserJWT, checkAdmin, adminDiscountRoute);

const runServer = async () => {
  try {
    await db.sequelize.sync();
    db.sequelize.authenticate();
    console.log("Connected to Database");
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}


runServer();