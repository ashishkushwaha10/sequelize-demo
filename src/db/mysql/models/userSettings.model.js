"use strict";

const { Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../mysql.connection');
const Model = Sequelize.Model;
const bcrypt = require('bcryptjs');
const { salt } = require('../../../config/crypto.config');

class UserSettings extends Model { }

UserSettings.init({
    // Model attributes are defined here
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true
    },
    visibleToAll: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    tableName: 'user_settings', // We need to choose the model name
    timestamps: true, // this will add created_at and updated_at fields in current table, and sequelize will update its values respectively.
});


UserSettings.sync()
    .then(() => {
        console.log(`users_settings table synced...`);
    }).catch(err => {
        console.log(err);
    })

// the defined model is the class itself
console.log(UserSettings === sequelize.models.UserSettings); // true

//Exporting model to use it in other modules.
module.exports = UserSettings;

