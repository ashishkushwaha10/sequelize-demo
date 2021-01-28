"use strict";

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../mysql.connection');
const Model = Sequelize.Model;

const User = require('./user.model');

class Profile extends Model { }

Profile.init({
    // Model attributes are defined here
    fname: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    lname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fullName: {
        type: Sequelize.VIRTUAL,
        get () {
          return this.getDataValue('fname') + " " + this.getDataValue('lname');
        }
      }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    tableName: 'profiles', // We need to choose the model name
    timestamps: true, // this will add created_at and updated_at fields in current table, and sequelize will update its values respectively.
});

//post save hook to update profileId in users table.
Profile.afterCreate(async (profile, option) => {
    try {
        console.log(`profile: ${JSON.stringify(profile)}`);
        await User.update({ profileId: profile.id }, {
            where: {
              id: profile.userId
            },
            transaction: option.transaction
        });
    } catch (err) {
        console.log(err);
    }
})

Profile.sync()
    .then(() => {
        console.log(`profiles table synced...`);
    }).catch(err => {
        console.log(err);
    })

// the defined model is the class itself
console.log(Profile === sequelize.models.Profile); // true

//Exporting model to use it in other modules.
module.exports = Profile;