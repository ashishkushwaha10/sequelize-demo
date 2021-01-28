const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../public/swagger.json');
const router = require('express').Router();

module.exports = app => {
    router.use('/api-docs', swaggerUi.serve);
    router.use('/api-docs', swaggerUi.setup(swaggerDocument));

    app.use('/swagger', router)
}