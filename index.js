const AWS = require("aws-sdk");
const express = require("express");
const parser = require("body-parser");
const cors = require('cors');
const homeRouter = require('./routers/home-router');

const app = express();
const PORT = 3000;

require('dotenv').config();

app.use(cors({ origin: '*' }));

app.use('/', homeRouter);

app.listen(PORT, () => {
    console.log(`Listening on PORT #${PORT}`);
});
