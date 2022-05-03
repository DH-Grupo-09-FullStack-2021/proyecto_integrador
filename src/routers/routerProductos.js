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

routerProductos.post('/products/search', controllerProductos.searchPOST);

routerProductos.get('/products/search/:searchQuery', controllerProductos.search);

routerProductos.get('/products/api/', controllerProductos.api);

routerProductos.get('/products/api/:id', controllerProductos.apiID);

routerProductos.get('/products/apilastcreated', controllerProductos.apiLastCreated);

module.exports = routerProductos;
