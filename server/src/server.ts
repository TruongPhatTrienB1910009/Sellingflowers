import { Request, Response, NextFunction } from 'express';
const db = require('./app/models');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const { checkUserJWT } = require('./app/middlewares/authenticate')

// import router
const accountRoute = require('./app/routes/account.route');
const homeRoute = require('./app/routes/home.route');
const productRoute = require('./app/routes/product.route');
const cartRoute = require('./app/routes/cart.route');

const app = express();
app.use(express.json());
app.use(cors());

const port = 3000;


// handel router
app.use('/', homeRoute);
app.use('/account', checkUserJWT, accountRoute);
app.use('/products', productRoute);
app.use('/cart', checkUserJWT, cartRoute);

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