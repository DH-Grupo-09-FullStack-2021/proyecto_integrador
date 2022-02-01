const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/', controller.index);

router.get('/products', controller.plist);

router.get('/product/:id', controller.product);

router.get('/login', controller.login);

router.get('/cart', controller.cart);

router.get('/register', controller.register);

router.get('/profile', controller.profile);

router.get('/edit', controller.editar);

router.get('/submit', controller.submit);

/* router.get('', controller.); */

module.exports = router;
