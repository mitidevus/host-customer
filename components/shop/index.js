const express = require('express');
const router = express.Router();

const shopController = require('./shopController');

router.get('/', shopController.shop);


// router.get('/page/:page/sort/:filter', shopController.shop);

// router.get('/product_category/:category/page/:page', shopController.category);

// router.get('/product_category/:category/page/:page/sort/:filter', shopController.category);

module.exports = router;