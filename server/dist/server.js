"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const db = require('./app/models/index');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
// import router
const accountRoute = require('./app/routes/account.route');
const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
// handel router
app.use('/account', accountRoute);
try {
    db.sequelize.authenticate();
    console.log("Connected to Database");
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}
catch (error) {
    console.log(error);
}
