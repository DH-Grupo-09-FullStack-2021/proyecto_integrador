const express = require('express');
const routerProductos = express.Router();

const controllerProductos = require('../controllers/controllerProductos');
const upload = require('../middlewares/mdMulterProductos');

routerProductos.get('/products', controllerProductos.plist);

routerProductos.get('/products/detail/:id', controllerProductos.product);

routerProductos.get('/products/edit/:id', controllerProductos.editar);

routerProductos.put('/products/:id', controllerProductos.editarPUT);

routerProductos.get('/products/create', controllerProductos.submit);

routerProductos.post('/products', upload.single('imagenprod'), controllerProductos.submitPOST);

routerProductos.delete('/products/detail/products/delete/:id', controllerProductos.destroy);

module.exports = routerProductos;
