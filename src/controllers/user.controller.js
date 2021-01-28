"use strict";

const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const moment = require('moment');
const UserModelMongo = require('../db/mongo/models/user.model');
const UserModelMysql = require('../db/mysql/models/user.model');
const ProfileModelMysql = require('../db/mysql/models/profile.model');
const sequelize = require('../db/mysql/mysql.connection');
require('../db/mysql/dataAssociations');

const {Op} = require('sequelize');


class User {

    async getUsers() {
        try {
            let users = await UserModelMysql.findAll();
            if (users) return { errorCode: 0, errorStatus: "user found.", data: users };
            else return { errorCode: 0, errorStatus: "no user found.", data: users };
        } catch (err) {
            console.log(err);
            return { errorCode: 1, errorStatus: err };
        }
    }

    async includeAllRelatedTables(data) {
        try {
            let users = await UserModelMysql.findAll({
                include: {all: true}
            });
            if (users) return { errorCode: 0, errorStatus: "user found.", data: users };
            else return { errorCode: 0, errorStatus: "no user found.", data: users };
        } catch (err) {
            console.log(err);
            return { errorCode: 1, errorStatus: err };
        }
    }

    async getUserData(id) {
        try {
            let user = await UserModelMysql.findOne({
                where: {
                    id
                },
                attributes: {exclude: ['password']},
                include: [ProfileModelMysql]
            });
            if (user) return { errorCode: 0, errorStatus: "user found.", data: user };
            else return { errorCode: 0, errorStatus: "no user found.", data: user };
        } catch (err) {
            console.log(err);
            return { errorCode: 1, errorStatus: err };
        }
    }

    async getUserById(id) {
        try {
            let user = await UserModelMysql.findByPk(id, {
                attributes: {exclude: ['password']},
                include: [ProfileModelMysql]
            });
            if (user) return { errorCode: 0, errorStatus: "user found.", data: user };
            else return { errorCode: 0, errorStatus: "no user found.", data: user };
        } catch (err) {
            console.log(err);
            return { errorCode: 1, errorStatus: err };
        }
    }

    async getUsersByDate(data) {
        try {
            let fromDate = data.fromDate,
                toDate = data.toDate;

            
            let user = await UserModelMysql.findAll({
                where: {
                    createdAt: {
                        [Op.gt] : fromDate,
                        [Op.lt] : toDate
                    }
                }
            });
            if (user) return { errorCode: 0, errorStatus: "user found.", data: user };
            else return { errorCode: 0, errorStatus: "no user found.", data: user };
        } catch (err) {
            console.log(err);
            return { errorCode: 1, errorStatus: err };
        }
    }

    async getAllUsersRaw() {
        try {
            let user = await sequelize.query("SELECT id, email, profileId, createdAt, updatedAt FROM users", { type: sequelize.QueryTypes.SELECT });
            console.log(user);
            if (user.length > 0) return { errorCode: 0, errorStatus: "user found.", data: user };
            else return { errorCode: 0, errorStatus: "no user found.", data: user };
        } catch (err) {
            console.log(err);
            return { errorCode: 1, errorStatus: err };
        }
    }

    async getUsersWithProfile() {
        try {
            console.log(`called`);
            let user = await UserModelMysql.findAll({
                attributes: {exclude: ['password']},
                where: {
                    id: {
                        [Op.in]: sequelize.literal(`(
                                SELECT userId
                                FROM profiles
                            )`)
                    }
                }
            });
            if (user.length > 0 || Object.keys(user).length > 0) return { errorCode: 0, errorStatus: "user found.", data: user };
            else return { errorCode: 0, errorStatus: "no user found.", data: user };
        } catch (err) {
            console.log(err);
            return { errorCode: 1, errorStatus: err };
        }
    }

}

module.exports = User;