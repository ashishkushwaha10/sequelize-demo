"use strict";

const express = require('express');
const bp = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

// security protection.
app.use(helmet());

// enabling cors.
app.use(cors());

// setting body-parser for parsing query params.
app.use(bp.json());
app.use(bp.urlencoded({extended: true}));

//injecting mongo connection.
require('./db/mongo/mongo.connection');

//injecting mysql connection.
require('./db/mysql/mysql.connection');

//setting routes.
require('./routes')(app);

const start = (PORT) => {
    app.listen(PORT, () => {
        console.log(`auth server running at port ${PORT}`);
    })
}


module.exports = {
    start
}