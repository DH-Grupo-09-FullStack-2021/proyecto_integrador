const express = require('express');
const routerUsuarios = express.Router();
const controllerUsuarios = require('../controllers/controllerUsuarios');
const upload = require('../middlewares/mdMulterUsuarios');

routerUsuarios.get('/login', controllerUsuarios.login);

routerUsuarios.post('/login', controllerUsuarios.loginPOST)

routerUsuarios.get('/register', controllerUsuarios.register);

routerUsuarios.get('/profile', controllerUsuarios.profile);

routerUsuarios.post('/register', upload.single('imagenUser'), controllerUsuarios.registerPOST);

routerUsuarios.get('/logout',controllerUsuarios.logout);

module.exports = routerUsuarios;
