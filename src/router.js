const express = require('express');
const { check } = require('express-validator');
const multer = require('multer');
const path = require('path')
const router = express.Router();
const upload = multer({ dest: '../public/img/' });
const controller = require('./controller');
const validatorRegister=require('./middlewares/validatorRegister');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/img/profile'))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
    }
  })
  const Proupload = multer({ storage })
  
router.get('/', controller.index);

router.get('/products', controller.plist);

router.get('/products/detail/:id', controller.product);

router.get('/login', controller.login);

router.post('/login',[check('emailusuario').isEmail().withMessage('Email Invalido')],controller.loginPOST)

router.get('/cart', controller.cart);

router.get('/register', controller.register);

router.get('/profile', controller.profile);

router.get('/products/edit/:id', controller.editar);

router.put('/products/:id', controller.editarPUT);

router.get('/products/create', controller.submit);

router.post('/products', upload.single('imagenprod'), controller.submitPOST);

router.post('/register',validatorRegister, Proupload.single('imagenUser'), controller.registerPOST);

router.delete('/products/detail/products/delete/:id', controller.destroy);

router.get('/logout',controller.logout)

module.exports = router;
