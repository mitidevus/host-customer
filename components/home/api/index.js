const express = require('express');
const router = express.Router();

const homeApiController = require('./homeApiController');

router.get('/', homeApiController.getAllHotProduct);

module.exports = router;