const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/', controller.index);

router.get('/product', controller.product);

router.get('/login', controller.login);

router.get('/cart', controller.cart);

router.get('/register', controller.register);

/* router.get('', controller.); */

module.exports = router;
