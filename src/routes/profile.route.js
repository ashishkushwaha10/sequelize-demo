const router = require('express').Router();
const ProfileCtrl = require('../controllers/profile.controller');
const profileCtrl = new ProfileCtrl();

function sendSuccess(errorCode, errorStatus, data, res) {
    return res.send({ errorCode, data, errorStatus });
}

function sendError(errorCode, errorStatus, res) {
    return res.send({ errorCode, errorStatus });
}

router.route('/:id/mysql')
    .get(async (req, res) => {
        try {
            console.log(req.params.id);
            let response = await profileCtrl.getProfileData(req.params.id);
            if (response.errorCode == 0)
                sendSuccess(response.errorCode, response.errorStatus, response.data, res);
            else
                sendError(response.errorCode, response.errorStatus, res);
        } catch (err) {
            console.log(err);
            sendError(1, err, res);
        }
    })

router.route('/getProfileById/mysql')
    .get(async (req, res) => {
        try {
            console.log(req.body);
            let response = await profileCtrl.getProfileById();
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
    .post(async (req, res) => {
        try {
            console.log(req.body);
            let response = await profileCtrl.createProfile(req.body);
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