if(process.env.NODE_ENV != "production")
    require('dotenv').config();

const server = require('./src/server');

server.start(process.env.PORT);
