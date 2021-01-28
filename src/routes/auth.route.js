const router = require('express').Router();
const AuthCtrl = require('../controllers/auth.controller');
const authCtrl = new AuthCtrl();


module.exports = app => {
    function sendSuccess(errorCode, errorStatus, data, res) {
        return res.send({ errorCode, data, errorStatus });
    }

    function sendError(errorCode, errorStatus, res) {
        return res.send({ errorCode, errorStatus });
    }

    /**
     * Routes for mongoDB starts here.
     */

    // this route will add user in mongoDB.
    router.route('/mongo/register')
        .post(async (req, res) => {
            try {
                console.log(req.body);
                let response = await authCtrl.registerMongo(req.body);
                if (response.errorCode == 0)
                    sendSuccess(response.errorCode, response.errorStatus, response.data, res);
                else
                    sendError(response.errorCode, response.errorStatus, res);
            } catch (err) {
                console.log(err);
                sendError(1, err, res);
            }
        })

    // this route will search user from mongoDB.
    router.route('/mongo/login')
        .post(async (req, res) => {
            try {
                let response = await authCtrl.loginMongo(req.body);
                if (response.errorCode == 0)
                    sendSuccess(response.errorCode, response.errorStatus, response.data, res);
                else
                    sendError(response.errorCode, response.errorStatus, res);
            } catch (err) {
                console.log(err);
                sendError(1, err, res);
            }
        })

    // this api will be used to generate access_token for users in mongoDB
    router.route('/mongo/refresh/grant')
        .post(async (req, res) => {
            try {
                let response = await authCtrl.refreshGrantMongo(req.body);
                if (response.errorCode == 0)
                    sendSuccess(response.errorCode, response.errorStatus, response.data, res);
                else
                    sendError(response.errorCode, response.errorStatus, res);
            } catch (err) {
                console.log(err);
                sendError(1, err, res);
            }
        })

    /**
 * Routes for mongoDB ends here.
 */


    /**
* Routes for Mysql starts here.
*/


    // this route will add user in mongoDB.
    router.route('/mysql/register')
        .post(async (req, res) => {
            try {
                console.log(req.body);
                let response = await authCtrl.registerMySQL(req.body);
                if (response.errorCode == 0)
                    sendSuccess(response.errorCode, response.errorStatus, response.data, res);
                else
                    sendError(response.errorCode, response.errorStatus, res);
            } catch (err) {
                console.log(err);
                sendError(1, err, res);
            }
        })

    // this route will search user from mongoDB.
    router.route('/mysql/login')
        .post(async (req, res) => {
            try {
                let response = await authCtrl.loginMySQL(req.body);
                if (response.errorCode == 0)
                    sendSuccess(response.errorCode, response.errorStatus, response.data, res);
                else
                    sendError(response.errorCode, response.errorStatus, res);
            } catch (err) {
                console.log(err);
                sendError(1, err, res);
            }
        })

    // this api will be used to generate access_token for users in mongoDB
    router.route('/mysql/refresh/grant')
        .post(async (req, res) => {
            try {
                let response = await authCtrl.refreshGrantMySQL(req.body);
                if (response.errorCode == 0)
                    sendSuccess(response.errorCode, response.errorStatus, response.data, res);
                else
                    sendError(response.errorCode, response.errorStatus, res);
            } catch (err) {
                console.log(err);
                sendError(1, err, res);
            }
        })

        router.route('/createUserWithSettings/mysql')
        .post(async (req, res) => {
            try {
                let response = await authCtrl.createUserWithSettings(req.body);
                if (response.errorCode == 0)
                    sendSuccess(response.errorCode, response.errorStatus, response.data, res);
                else
                    sendError(response.errorCode, response.errorStatus, res);
            } catch (err) {
                console.log(err);
                sendError(1, err, res);
            }
        })

        

    /**
     * Routes for Mysql ends here.
     */

    router.route('/test')
        .get((req, res) => {
            return res.send(`in auth token get request.`);
        })

    app.use('/auth', router);
}