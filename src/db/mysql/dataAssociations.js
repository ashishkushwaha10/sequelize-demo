const { Sequelize, Model, DataTypes } = require('sequelize');
const User = require('./models/user.model');
const sequelize = require('./mysql.connection');
const Profile = require('./models/profile.model');
const UserSettings = require('./models/userSettings.model');

// self executing function.
(function dataAssociations() {
        User.hasOne(Profile, { foreignKey: 'userId', sourceKey: 'id' }),
        Profile.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' })

        User.hasOne(UserSettings, { foreignKey: 'userId', sourceKey: 'id' }),
        UserSettings.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' })
})();