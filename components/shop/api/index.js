const express = require('express');
const router = express.Router();

const shopController = require('../shopController');

router.get('/', shopController.getApiProducts);

module.exports = router;