const express = require('express');
const routerCarrito = express.Router();
const controllerCarrito = require('../controllers/controllerCarrito');

routerCarrito.get('/cart', controllerCarrito.cart);

routerCarrito.post('/cart/add/:id', controllerCarrito.cartPOST);

routerCarrito.get('/cart/add/:id', controllerCarrito.cartPOST);

routerCarrito.post('/cart/remove/:id', controllerCarrito.cartDELETE);

module.exports = routerCarrito;
