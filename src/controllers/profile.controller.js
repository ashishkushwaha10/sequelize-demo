"use strict";

const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const moment = require('moment');
const UserModelMysql = require('../db/mysql/models/user.model');
const ProfileModelMysql = require('../db/mysql/models/profile.model');
require('../db/mysql/dataAssociations');

class Profile {

    async getProfileData(id) {
        try {
            let user = await ProfileModelMysql.findOne({
                where: {
                    id
                },
                include: [{model: UserModelMysql, attributes: {exclude: ['password']}}]
            });
            console.log(user);
            if (user != null && Object.keys(user).length > 0) return { errorCode: 0, errorStatus: "user found.", data: user };
            else return { errorCode: 0, errorStatus: "no user found.", data: user };
        } catch (err) {
            console.log(err);
            return { errorCode: 1, errorStatus: err };
        }
    }

    async getProfileById(id) {
        try {
            let user = await ProfileModelMysql.findByPk(id);
            if (user) return { errorCode: 0, errorStatus: "user found.", data: user };
            else return { errorCode: 0, errorStatus: "no user found.", data: user };
        } catch (err) {
            console.log(err);
            return { errorCode: 1, errorStatus: err };
        }
    }

    async createProfile(body) {
        try {
            let data = {
                fname: body.fname,
                lname: body.lname,
                gender: body.gender,
                userId: body.userId
            }
            let user = await ProfileModelMysql.create(data);
            if (user) return { errorCode: 0, errorStatus: "Data Inserted", data: user };
            else return { errorCode: 0, errorStatus: "no user found.", data: user };
        } catch (err) {
            console.log(err);
            return { errorCode: 1, errorStatus: err };
        }
    }
}

module.exports = Profile;