const express = require('express');
const router = express.Router();

const detailController = require('./detailController');

router.get('/:productId', detailController.detail);

module.exports = router;
