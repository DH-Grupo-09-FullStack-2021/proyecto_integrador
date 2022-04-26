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

routerUsuarios.get('/users/api/', controllerUsuarios.api);

routerUsuarios.get('/users/api/:id', controllerUsuarios.apiID);

routerUsuarios.get('/users/apilastcreated', controllerUsuarios.apiLastCreated);

module.exports = routerUsuarios;
