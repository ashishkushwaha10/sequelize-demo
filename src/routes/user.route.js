const router = require('express').Router();
const UserCtrl = require('../controllers/user.controller');
const AuthCtrl = require('../controllers/auth.controller');
const authCtrl = new AuthCtrl();
const userCtrl = new UserCtrl();

module.exports = (app) => {

    router.use(authCtrl.isAuthorized);

    function sendSuccess(errorCode, errorStatus, data, res) {
        return res.send({ errorCode, data, errorStatus });
    }

    function sendError(errorCode, errorStatus, res) {
        return res.send({ errorCode, errorStatus });
    }

    router.route('/user/:id')
        .get(async (req, res) => {
            try {
                console.log(req.params);
                let response = await userCtrl.getUserData(req.params.id);
                if (response.errorCode == 0)
                    sendSuccess(response.errorCode, response.errorStatus, response.data, res);
                else
                    sendError(response.errorCode, response.errorStatus, res);
            } catch (err) {
                console.log(err);
                sendError(1, err, res);
            }
        })

    router.route('/user/getUserById/:id')
        .get(async (req, res) => {
            try {
                console.log(req.params);
                let response = await userCtrl.getUserById(req.params.id);
                if (response.errorCode == 0)
                    sendSuccess(response.errorCode, response.errorStatus, response.data, res);
                else
                    sendError(response.errorCode, response.errorStatus, res);
            } catch (err) {
                console.log(err);
                sendError(1, err, res);
            }
        })

    router.route('/includeAll/mysql')
        .get(async (req, res) => {
            try {
                console.log(req.body);
                let response = await userCtrl.includeAllRelatedTables();
                if (response.errorCode == 0)
                    sendSuccess(response.errorCode, response.errorStatus, response.data, res);
                else
                    sendError(response.errorCode, response.errorStatus, res);
            } catch (err) {
                console.log(err);
                sendError(1, err, res);
            }
        })

    router.route('/mysql/raw')
        .get(async (req, res) => {
            try {
                console.log(req.body);
                let response = await userCtrl.getAllUsersRaw();
                if (response.errorCode == 0)
                    sendSuccess(response.errorCode, response.errorStatus, response.data, res);
                else
                    sendError(response.errorCode, response.errorStatus, res);
            } catch (err) {
                console.log(err);
                sendError(1, err, res);
            }
        })

    router.route('/mysql')
        .get(async (req, res) => {
            try {
                console.log(req.body);
                let response = await userCtrl.getUsers();
                if (response.errorCode == 0)
                    sendSuccess(response.errorCode, response.errorStatus, response.data, res);
                else
                    sendError(response.errorCode, response.errorStatus, res);
            } catch (err) {
                console.log(err);
                sendError(1, err, res);
            }
        });

    router.route('/getUsersWithProfile/mysql')
        .get(async (req, res) => {
            try {
                let response = await userCtrl.getUsersWithProfile();
                if (response.errorCode == 0)
                    sendSuccess(response.errorCode, response.errorStatus, response.data, res);
                else
                    sendError(response.errorCode, response.errorStatus, res);
            } catch (err) {
                console.log(err);
                sendError(1, err, res);
            }
        });

        
    router.route('/getUsersByDate/mysql')
        .post(async (req, res) => {
            try {
                let response = await userCtrl.getUsersByDate(req.body);
                if (response.errorCode == 0)
                    sendSuccess(response.errorCode, response.errorStatus, response.data, res);
                else
                    sendError(response.errorCode, response.errorStatus, res);
            } catch (err) {
                console.log(err);
                sendError(1, err, res);
            }
        });
        


    router.use('/user/profile', require('./profile.route'))
    router.use('/user/usersettings', require('./userSettings.route'))

    app.use('/users', router);
};