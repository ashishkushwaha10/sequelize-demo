"use strict";

const { Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../mysql.connection');
const Model = Sequelize.Model;

class RefreshToken extends Model { }

RefreshToken.init({
    // Model attributes are defined here
    refresh_token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expires_at: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    tableName: 'refresh_tokens', // We need to choose the model name
    timestamps: true, // this will add created_at and updated_at fields in current table, and sequelize will update its values respectively.
});

RefreshToken.sync()
    .then(() => {
        console.log(`refresh_tokens table synced...`);
    }).catch(err => {
        console.log(err);
    })

// the defined model is the class itself
console.log(RefreshToken === sequelize.models.RefreshToken); // true

module.exports = RefreshToken;

