"use strict";

const UserModelMongo = require('../db/mongo/models/user.model');
const UserSettingsModelMysql = require('../db/mysql/models/userSettings.model');
const ProfileModelMysql = require('../db/mysql/models/profile.model');
require('../db/mysql/dataAssociations');


class UserSetting {

    async create(body) {
        try {
            let data = {
                userId : body.userId
            };
            let users = await UserSettingsModelMysql.create(data);
            if (users) return { errorCode: 0, errorStatus: "user setting inserted", data: users };
            else return { errorCode: 0, errorStatus: "setting insertion failed..", data: users };
        } catch (err) {
            console.log(err);
            return { errorCode: 1, errorStatus: err };
        }
    }

    
}

module.exports = UserSetting;