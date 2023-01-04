const express = require('express');
const router = express.Router();

const cartCheckoutController = require('./cartCheckoutController');

router.get('/', cartCheckoutController.cartCheckout);//shop page

router.post('/', cartCheckoutController.addToCart)

router.delete("/:id", cartCheckoutController.delete)

router.post("/update/:id", cartCheckoutController.update)

module.exports = router;