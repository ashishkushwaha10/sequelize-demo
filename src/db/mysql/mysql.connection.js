const Sequelize = require('sequelize');
const {host, user, pass, dbname, dialect} = require('../../config/db.config').mysql;

const sequelize = new Sequelize(dbname, user, pass, {
    host,
    dialect,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

new Promise((resolve, reject) => {
    sequelize.authenticate();
})
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', error);
    })

module.exports = sequelize;