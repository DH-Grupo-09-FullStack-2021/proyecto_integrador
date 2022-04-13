const express = require('express');
const bcrypt = require('bcryptjs')
const db = require('../basedatos');

const controllerUsuarios =
{
    login: (req, res) =>
    {
		res.render("login");
    },

	loginPOST:(req,res)=>
	{
		let errors = validationResult(req.body);

		if (errors.isEmpty())
		{	    
			(async () => {
				const usertologin = await db.user.findOne({
					where: {email: req.body.emailusuario}})
		
				if (usertologin !== null)
				{
					if (!bcrypt.compareSync(req.body.contrasenausuario, usertologin.password))
					{
						req.body.contrasenausuario = null;
						return res.render("login", { errors: {
							contrasenausuario: {
							msg: "Contraseña incorrecta",
							param: 'contrasenausuario',
							value: null,
							location: 'body'
						}}, old: req.body});
					}

					req.session.user = usertologin;
		    
					res.cookie("email", usertologin.email,{maxAge:1000*60}*30)
		    
					return res.redirect("profile");
				}
				else
				{
					return res.render("login", { errors: {
					emailusuario: {
						msg: "Este E-mail nunca ha sido registrado",
						param: 'emailusuario',
						value: req.body.emailusuario,
						location: 'body'
					}}, old: req.body});
				}
			})();
		}
		else
			return res.render("register", { errors: errors.mapped(), old: req.body});
	},

    register: (req, res) =>
    {
		res.render("register");
    },

    registerPOST: (req, res) =>
    {
		let errors = validationResult(req.body);

		if (errors.isEmpty())
		{
			let archivo_imagen = null;
	    
			if (req.file)		
			archivo_imagen = req.file.filename;
			const user_pwd = bcrypt.hashSync(req.body.contrasenausuario, 10);
			if (req.body.nombreusuario.length == 0)
			{
				return res.render("register", { errors: {
					nombreusuario: {
					msg: "Debe ingresar un nombre de usuario",
					param: 'nombreusuario',
					value: null,
					location: 'body'
				}}, old: req.body});
			}
			else if (req.body.nombreusuario.length < 8)
			{
				return res.render("register", { errors: {
					nombreusuario: {
					msg: "El nombre de usuario debe tener al menos 8 caracteres",
					param: 'nombreusuario',
					value: null,
					location: 'body'
				}}, old: req.body});
			}

			if (req.body.emailusuario.length == 0)
			{
				return res.render("register", { errors: {
					emailusuario: {
					msg: "Debe ingresar una direccion de email",
					param: 'emailusuario',
					value: null,
					location: 'body'
				}}, old: req.body});
			}
			
			if (req.body.contrasenausuario.length >= 8)
			{
				if (req.body.contrasenausuario !== req.body.contrasenausuario2)
				{
					req.body.contrasenausuario2 = null;
					return res.render("register", { errors: {
						contrasenausuario2: {
						msg: "Las contraseñas no coinciden",
						param: 'contrasenausuario2',
						value: null,
						location: 'body'
					}}, old: req.body});
				}
			}
			else
			{
				return res.render("register", { errors: {
					contrasenausuario: {
					msg: "La contraseña debe tener al menos 8 caracteres",
					param: 'contrasenausuario',
					value: null,
					location: 'body'
		    	}}, old: req.body});
			}
	    
			(async () => {
				const [new_user, created] = await db.user.findOrCreate({
					where: { email: req.body.emailusuario },
					defaults: {
						username: req.body.nombreusuario,
						password: user_pwd,
						img: archivo_imagen,
				}});
	    
				if (created)
				{
					req.session.user = new_user;
				
					res.cookie("email", new_user.email,{maxAge:1000*60}*30)
		    
					return res.redirect("profile");
				}
				else
				{
					return res.render("register", { errors: {
						emailusuario: {
							msg: "Este E-mail ya esta registrado",
							param: 'emailusuario',
							value: req.body.emailusuario,
							location: 'body'
					}}, old: req.body});
				}
			})();
		}
		else
			return res.render("register", { errors: errors.mapped(), old: req.body});
    },
    
    profile: (req, res) =>
    {
		return res.render("profile",{userData:req.session.user});
    },
    
    logout: (req,res) =>
    {
		req.session.destroy();
		res.clearCookie("email");
		return res.redirect("/")	
    },
};

module.exports = controllerUsuarios;
