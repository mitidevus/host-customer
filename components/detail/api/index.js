const express = require('express');
const router = express.Router();

const detailApiController = require('./detailApiController');

router.get('/:productId', detailApiController.getReviewByProductId);

router.post('/', detailApiController.createReview);

module.exports = router;