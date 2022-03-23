const express = require('express');
const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator')
const bcrypt=require('bcryptjs')
const db = require('./basedatos');

let products = [], users = [];

db.product.findAll().then(p => { products = p });
db.user.findAll().then(p => { users = p });


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

	loginPOST:(req,res)=>{
		const usertologin = users.find(oneUser=> oneUser.email===req.body.emailusuario);

		if(usertologin===undefined){
			return res.send("no existe el ususario")
		}
		if(usertologin!==undefined){
			const isPasswordOk= bcrypt.compareSync(req.body.contrasenausuario,usertologin.password);

			if(!isPasswordOk){
				return res.send("las contraseñas no coinciden")
			}

			delete usertologin.password ;
			req.session.user= usertologin;

			res.cookie("email",usertologin.email,{maxAge:1000*60}*30)

			return res.redirect("profile")
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
		let archivo_imagen;

		if (req.file)		
			archivo_imagen = req.file.filename;
		else
			archivo_imagen = null;

	users.push({
	    username: req.body.nombreusuario,
	    email: req.body.emailusuario,
	    id: users.length + 1,
	    password: bcrypt.hashSync(req.body.contrasenausuario,10),
	    img: archivo_imagen,
	});

	db.user.create({
	    username: req.body.nombreusuario,
	    email: req.body.emailusuario,
	    password: bcrypt.hashSync(req.body.contrasenausuario,10),
	    img: archivo_imagen,
	});
	
			const usertologin = users.find(oneUser=> oneUser.email===req.body.emailusuario);

		if(usertologin===undefined){
			return res.send("no existe el ususario")
		}
		if(usertologin!==undefined){
			const isPasswordOk= bcrypt.compareSync(req.body.contrasenausuario,usertologin.password);

			if(!isPasswordOk){
				return res.send("las contraseñas no coinciden")
			}

			delete usertologin.password ;
			req.session.user= usertologin;

			res.cookie("email",usertologin.email,{maxAge:1000*60}*30)

		}

	
	res.redirect("/profile");
	
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
