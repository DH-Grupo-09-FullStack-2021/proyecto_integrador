const express = require('express');
const multer = require('multer');
const router = express.Router();
const upload = multer({ dest: '../public/img/' });
const controller = require('./controller');

router.get('/', controller.index);

router.get('/products', controller.plist);

router.get('/products/detail/:id', controller.product);

router.get('/login', controller.login);

router.get('/cart', controller.cart);

router.get('/register', controller.register);

router.get('/profile', controller.profile);

router.get('/products/edit/:id', controller.editar);

router.put('/products/:id', controller.editarPUT);

router.get('/products/create', controller.submit);

router.post('/products', upload.single('imagenprod'), controller.submitPOST);

router.delete('/products/detail/products/delete/:id', controller.destroy);

module.exports = router;
