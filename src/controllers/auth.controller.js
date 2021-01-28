"use strict";

const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const moment = require('moment');
const RefreshTokenModelMongo = require('../db/mongo/models/refreshToken.model');
const UserModelMongo = require('../db/mongo/models/user.model');
const UserModelMysql = require('../db/mysql/models/user.model');
const RefreshTokenModelMysql = require('../db/mysql/models/refreshToken.model');
const { secret, expiry } = require('../config/jwt.config');
const sequelize = require('../db/mysql/mysql.connection');
const UserSettings = require('../db/mysql/models/userSettings.model');

class Auth {

    /**
     * Mongo controller starts.
     */

    async registerMongo(user) {
        try {
            if (!('email' in user) || user.email == "")
                return { errorCode: 1, errorStatus: "email is required." };

            if (!('password' in user) || user.password == "")
                return { errorCode: 1, errorStatus: "password is required." };

            let userModel = new UserModelMongo(user);
            let isRegistered = await userModel.save();
            return { errorCode: 0, errorStatus: "user registered successfully.", data: isRegistered };
        } catch (err) {
            console.log(err);
            return { errorCode: 1, errorStatus: err };
        }
    }

    async loginMongo(user) {
        try {
            let dataArr = {};
            if (!('email' in user) || user.email == "")
                return { errorCode: 1, errorStatus: "email is required." };

            if (!('password' in user) || user.password == "")
                return { errorCode: 1, errorStatus: "password is required." };

            let userData = await UserModelMongo.findOne({ email: user.email });

            if (!userData)
                return { errorCode: 1, errorStatus: "User/Pass Invalid." };

            if (!bcryptjs.compareSync(user.password, userData.password))
                return { errorCode: 1, errorStatus: "User/Pass Invalid." };

            dataArr.refresh_token = bcryptjs.hashSync(Math.random().toString(36).substring(7));
            dataArr.refresh_token_expiry = moment().add(24, 'h').format("YYYY-MM-DD HH:mm:ss");

            let isCreated = await RefreshTokenModelMongo.create({
                refresh_token: dataArr.refresh_token,
                expires_at: dataArr.refresh_token_expiry
            });

            if (!isCreated)
                return { errorCode: 1, errorStatus: "Something went wrong." };

            let jwt_data = this.createJWT({ email: user.email });
            if (jwt_data.errorCode == 0) {
                dataArr.type = "Bearer";
                dataArr.access_token = jwt_data.data.token;
                dataArr.jwt_expiry = jwt_data.data.jwt_expiry;
            }
            return { errorCode: 0, errorStatus: "token generated successfully.", data: dataArr };
        } catch (err) {
            console.log(err);
            return { errorCode: 1, errorStatus: err };
        }
    }

    async refreshGrantMongo(reqBody) {
        try {
            let dataArr = {};
            if (!('refresh_token' in reqBody) || reqBody.refresh_token == "")
                return { errorCode: 1, errorStatus: "refresh_token is required." };

            if (!('email' in reqBody) || reqBody.email == "")
                return { errorCode: 1, errorStatus: "email is required" };

            let response = await RefreshTokenModelMongo.findOne({ refresh_token: reqBody.refresh_token });
            console.log(response)
            if (!response || response.expires_at < new Date())
                return { errorCode: 1, errorStatus: "Invalid token" };

            let jwt_data = this.createJWT({ email: reqBody.email });
            if (jwt_data.errorCode == 0) {
                dataArr.refresh_token = reqBody.refresh_token;
                dataArr.type = "Bearer";
                dataArr.access_token = jwt_data.data.token;
                dataArr.jwt_expiry = jwt_data.data.jwt_expiry;
                return { errorCode: 0, errorStatus: "token generated successfully.", data: dataArr };
            } else {
                return { errorCode: 1, errorStatus: "Something went wrong" };
            }
        } catch (err) {
            console.log(err);
            return { errorCode: 1, errorStatus: err };
        }
    }

    /**
     * Mongo controller ends.
     */


    /**
     * MySQL controller.
     */


    async registerMySQL(user) {
        try {
            if (!('email' in user) || user.email == "")
                return { errorCode: 1, errorStatus: "email is required." };

            if (!('password' in user) || user.password == "")
                return { errorCode: 1, errorStatus: "password is required." };

            let created = await UserModelMysql.create(user);
            return { errorCode: 0, errorStatus: "user registered successfully.", data: created };
        } catch (err) {
            console.log(err);
            return { errorCode: 1, errorStatus: err };
        }
    }

    async loginMySQL(user) {
        try {
            let dataArr = {};
            if (!('email' in user) || user.email == "")
                return { errorCode: 1, errorStatus: "email is required." };

            if (!('password' in user) || user.password == "")
                return { errorCode: 1, errorStatus: "password is required." };

            console.log(user);

            let userData = await UserModelMysql.findOne({ where: { email: user.email } });
            console.log(userData);
            if (!userData)
                return { errorCode: 1, errorStatus: "User/Pass Invalid." };

            if (!bcryptjs.compareSync(user.password, userData.password))
                return { errorCode: 1, errorStatus: "Pass Invalid." };

            dataArr.refresh_token = bcryptjs.hashSync(Math.random().toString(36).substring(7));
            dataArr.refresh_token_expiry = moment().add(24, 'h').format("YYYY-MM-DD HH:mm:ss");

            let isCreated = await RefreshTokenModelMysql.create({
                refresh_token: dataArr.refresh_token,
                expires_at: dataArr.refresh_token_expiry
            });

            if (!isCreated)
                return { errorCode: 1, errorStatus: "Something went wrong." };

            let jwt_data = this.createJWT({ email: user.email });
            if (jwt_data.errorCode == 0) {
                dataArr.type = "Bearer";
                dataArr.access_token = jwt_data.data.token;
                dataArr.jwt_expiry = jwt_data.data.jwt_expiry;
            }
            return { errorCode: 0, errorStatus: "token generated successfully.", data: dataArr };
        } catch (err) {
            console.log(err);
            return { errorCode: 1, errorStatus: err };
        }
    }

    async refreshGrantMySQL(reqBody) {
        try {
            let dataArr = {};
            if (!('refresh_token' in reqBody) || reqBody.refresh_token == "")
                return { errorCode: 1, errorStatus: "refresh_token is required." };

            if (!('email' in reqBody) || reqBody.email == "")
                return { errorCode: 1, errorStatus: "email is required" };

            let response = await RefreshTokenModelMysql.findOne({
                where: {
                    refresh_token: reqBody.refresh_token
                }
            });
            console.log(response)
            if (!response || response.expires_at < new Date())
                return { errorCode: 1, errorStatus: "Invalid token" };

            let jwt_data = this.createJWT({ email: reqBody.email });
            if (jwt_data.errorCode == 0) {
                dataArr.refresh_token = reqBody.refresh_token;
                dataArr.type = "Bearer";
                dataArr.access_token = jwt_data.data.token;
                dataArr.jwt_expiry = jwt_data.data.jwt_expiry;
                return { errorCode: 0, errorStatus: "token generated successfully.", data: dataArr };
            } else {
                return { errorCode: 1, errorStatus: "Something went wrong" };
            }
        } catch (err) {
            console.log(err);
            return { errorCode: 1, errorStatus: err };
        }
    }

    createJWT(reqBody) {
        try {
            let payload = {};
            payload.email = reqBody.email;
            let token = jwt.sign(payload, secret, { expiresIn: expiry, algorithm: 'HS256' });
            console.log(token);
            let decodedData = jwt.decode(token);
            console.log(decodedData);
            return { errorCode: 0, errorStatus: 'token generated.', data: { token, jwt_expiry: moment.unix(decodedData.exp).format("YYYY-MM-DD HH:mm:ss") } };
        } catch (err) {
            return err;
        }
    }

    isAuthorized(req, res, next) {
        try {
            if (!('token' in req.headers) || req.headers.token == "")
                return res.send({ errorCode: 1, errorStatus: "Invalid token." });
            if (req.headers.token.split(" ")[0] != "Bearer")
                return res.send({ errorCode: 1, errorStatus: "Token. must be of type Bearer" });

            console.log(`in is authorized`);
            console.log(req.headers);
            let token = req.headers.token.split(" ")[1];
            let isAuthorized = jwt.verify(token, secret);
            console.log(isAuthorized);
            if (isAuthorized)
                next();
            else
                return res.send({ errorCode: 1, errorStatus: "Unauthorized" });
        } catch (err) {
            return res.send({ errorCode: 1, errorStatus: err });
        }
    }

    async createUserWithSettings(user) {
        // creating transaction.
        const t = await sequelize.transaction();
        try {
            if (!('email' in user) || user.email == "")
                return { errorCode: 1, errorStatus: "email is required." };
    
            if (!('password' in user) || user.password == "")
                return { errorCode: 1, errorStatus: "password is required." };
    
            let created = await UserModelMysql.create(user, {transaction: t});

            let settingCreated = await UserSettings.create({userId: created.id}, {transaction: t});

            await t.commit();

            return { errorCode: 0, errorStatus: "user registered successfully.", data: created };
                
        } catch (err) {
            console.log(err);
            await t.rollback();
            return { errorCode: 1, errorStatus: err };
        }
    }
}


module.exports = Auth;