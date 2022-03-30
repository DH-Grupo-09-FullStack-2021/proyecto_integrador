const express = require('express');
const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator')
const bcrypt=require('bcryptjs')
const db = require('./basedatos');

let products = [];
db.product.findAll().then(p => { products = p });

const controller =
{
    index: (req, res) =>
    {
	let cuatro_prod = [];

	for (let i = 0; i < 4; i++)
	{
	    let rnd_prod = products[Math.floor(Math.random() * (products.length))];
	    if (cuatro_prod.indexOf(rnd_prod) !== -1)
			i--;
	    else
			cuatro_prod.push(rnd_prod);
	}
	
	res.render("index", {productos_lista: cuatro_prod});
    },

    product: (req, res) =>
    {
	let producto = 0;

	for (let i = 0; i < products.length; i++)
	{
	    if (products[i].id == req.params.id)
			producto = products[i];
	}

	let prodlist = [];

	for (let i = 0; i < 4; i++)
	{
	    let rnd_prod = products[Math.floor(Math.random() * (products.length))];
	    if (prodlist.indexOf(rnd_prod) !== -1 && rnd_prod.id !== req.params.id)
			i--;
	    else
			prodlist.push(rnd_prod);
	}

	res.render("product", {product: producto, productos_lista: prodlist});
    },

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
					/* avisar al usuario sobre email no registrado */
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
		{
			/* avisar al usuario sobre errores en el formulario */
			return res.render("register", { errors: errors.mapped(), old: req.body});
		} 
	},

    cart: (req, res) =>
    {
	res.render("cart");
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
		    /* avisar al usuario sobre email duplicado */
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
	{
	    /* avisar al usuario sobre errores en el formulario */
	    return res.render("register", { errors: errors.mapped(), old: req.body});
	}   
    },
    
    submit: (req, res) =>
    {
	res.render("submit");
    },
    
    submitPOST: (req, res) =>
    {
	products.push({
		name: req.body.nombreproducto,
		price: req.body.valorproducto,
		id: products.length + 1,
		maker: req.body.fabricadorproducto,
		desc: req.body.descprod,
		img: req.file.filename
	});

	db.product.create({
	    name: req.body.nombreproducto,
	    price: req.body.valorproducto,
	    maker: req.body.fabricadorproducto,
	    desc: req.body.descprod,
	    img: req.file.filename
	});

	res.redirect("/products");
    },
    
    editar: (req, res) =>
    {
	let producto = 0;

	for (let i = 0; i < products.length; i++)
	{
	    if (products[i].id == req.params.id)
		producto = products[i];
	}

	res.render("editar", {producto: producto});
    },

    editarPUT: (req, res) =>
    {
	for (let p of products)
	{
	    if (p.id == req.params.id)
	    {
		p.name = req.body.nombreproducto;
		p.price = req.body.valorproducto;
		p.maker = req.body.fabricadorproducto;
		p.desc = req.body.descprod;
		p.save();
		break;
	    }
	}
	
	res.redirect("/products");
    },
    
    profile: (req, res) =>
    {
		return res.render("profile",{userData:req.session.user});
    },
    
    plist: (req, res) =>
    {
	res.render("plist", {productos_lista: products});
    },

    destroy: (req, res) =>
    {
	let products2 = products.filter(function(element)
	{
	    return element.id != req.params.id;
	});

	products = products2;

	db.product.findByPk(req.params.id).destroy();

	res.redirect('/products');
    },
    
    logout: (req,res) =>
    {
	req.session.destroy();
	res.clearCookie("email");
	res.redirect("/")	
    },
};

module.exports = controller;
