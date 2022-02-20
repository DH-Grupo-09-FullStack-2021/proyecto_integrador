const express = require('express');
const {check,body}=require('express-validator')

const validatorRegister= [ check('nombreusuario').notEmpty().withMessage('Debes completar este campo')]

module.exports=validatorRegister