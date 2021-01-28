"use strict";

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../mysql.connection');
const Model = Sequelize.Model;
const bcrypt = require('bcryptjs');
const { salt } = require('../../../config/crypto.config');

class User extends Model { }

User.init({
    // Model attributes are defined here
    uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profileId: {
        type: DataTypes.INTEGER,
        unique: true
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    }
}, {
    // Other model options go here
    indexes: [
        {
            // unique: true,
            fields: ['email']
        }
    ],
    sequelize, // We need to pass the connection instance
    tableName: 'users', // We need to choose the model name
    paranoid: true,
    timestamps: true, // this will add created_at and updated_at fields in current table, and sequelize will update its values respectively.
});

//Adding scope for users with profiles.


// pre save hook. it will be called before saving any document in user collection. 
User.beforeCreate((user, option) => {
    try {
        return bcrypt.hash(user.password, salt)
            .then(hash => {
                user.password = hash;
            }).catch(err => {
                console.log(err);
                throw new Error(err);
            });
    } catch (err) {
        console.log(err);
    }
})

User.sync()
    .then(() => {
        console.log(`users table synced...`);
    }).catch(err => {
        console.log(err);
    })

// the defined model is the class itself
console.log(User === sequelize.models.User); // true

//Exporting model to use it in other modules.
module.exports = User;

