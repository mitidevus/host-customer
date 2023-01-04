const express = require('express');
const router = express.Router();

const blogController = require('./blogController');

router.get('/', blogController.blog);

module.exports = router;
