const express = require('express');
const router = express.Router();

const accountController = require('./accountController');

router.get('/userInfo', accountController.showAccountInfo);

router.get('/edit_profile', accountController.showEditProfile);
router.post('/edit_profile', accountController.editProfile);

router.get('/changePassword', accountController.showChangePassword);
router.post('/changePassword', accountController.changePassword);

module.exports = router;
