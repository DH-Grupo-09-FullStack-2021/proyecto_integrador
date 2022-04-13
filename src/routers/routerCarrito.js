const express = require('express');
const routerCarrito = express.Router();
const controllerCarrito = require('../controllers/controllerCarrito');

routerCarrito.get('/cart', controllerCarrito.cart);

routerCarrito.post('/cart/add/:id', controllerCarrito.cartPOST);

module.exports = routerCarrito;
