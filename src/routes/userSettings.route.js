const router = require('express').Router();
const UserSettingCtrl = require('../controllers/userSettings.controller');
const userSettingCtrl = new UserSettingCtrl();

function sendSuccess(errorCode, errorStatus, data, res) {
    return res.send({ errorCode, data, errorStatus });
}

function sendError(errorCode, errorStatus, res) {
    return res.send({ errorCode, errorStatus });
}


router.route('/mysql')
    .post(async (req, res) => {
        try {
            console.log(req.body);
            let response = await userSettingCtrl.create(req.body);
            if (response.errorCode == 0)
                sendSuccess(response.errorCode, response.errorStatus, response.data, res);
            else
                sendError(response.errorCode, response.errorStatus, res);
        } catch (err) {
            console.log(err);
            sendError(1, err, res);
        }
    })


module.exports = router;