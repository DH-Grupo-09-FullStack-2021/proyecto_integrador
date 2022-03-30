const express = require('express');
const {check,body}=require('express-validator')

const validatorRegister= [check('nombreusuario').notEmpty().withMessage('Debes completar este campo').bail()
			  .isLength({min: 8, max: 32}).withMessage("El nombre de usuario debe contener al menos 8 caracteres, y 32 como maximo"),
			  check('emailusuario').notEmpty().withMessage('Debes completar este campo').bail()
			  .isEmail().withMessage('Email Invalido'),
			  check('contrasenausuario').notEmpty().withMessage("Debes completar este campo").bail()
			  .isLength({min: 8, max: 32}).withMessage("La contraseña debe contener al menos 8 caracteres, y 32 como maximo"),
			  check('contrasenausuario2').notEmpty().withMessage("Debes completar este campo").bail()
			  .isLength({min: 8, max: 32}).withMessage("La contraseña debe contener al menos 8 caracteres, y 32 como maximo")];

module.exports=validatorRegister
