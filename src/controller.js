const express = require('express');
const fs = require('fs');
const path = require('path');

const products = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/products.json'), 'utf-8'));
const users = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/users.json'), 'utf-8'));

const controller =
{
    index: (req, res) =>
    {
	let cuatro_prod = [];

	for (let i = 0; i < 4; i++)
	{
	    cuatro_prod.push(products[Math.floor(Math.random() * (products.length))]);
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

	for (let i = 0; i < products.length; i++)
	{
	    if (products[i].id != req.params.id)
		prodlist.push(products[i]);
	}
	
	res.render("product", {product: producto, productos_lista: prodlist});
    },

    login: (req, res) =>
    {
	res.render("login");
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
	let newUserDB = users;

	newUserDB.push({
	    username: req.body.nombreusuario,
	    email: req.body.emailusuario,
	    password: req.body.contrasenausuario,
	    img: req.file.filename,
	    bio: ""
	});

	fs.writeFileSync("../db/users.json", JSON.stringify(newUserDB));
	
	res.redirect("/profile");
    },
    
    submit: (req, res) =>
    {
	res.render("submit");
    },
    
    submitPOST: (req, res) =>
    {
	let new_plist = products;

	let nuevo_producto={
		name: req.body.nombreproducto,
		price: req.body.valorproducto,
		id: products.length + 1,
		maker: req.body.fabricadorproducto,
		desc: req.body.descprod,
		img: req.file.filename
	    };

	new_plist.push(nuevo_producto)
	fs.writeFileSync("../db/products.json", JSON.stringify(new_plist));
	
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
		let idProductoSeleccionado = req.params.id;
		for (let p of products){
			if(p.id==idProductoSeleccionado){
				p.name= req.body.nombreproducto;
				p.price= req.body.valorproducto;
				p.maker=req.body.fabricadorproducto;
				p.desc=req.body.descprod;
				break;
			}
		}

		fs.writeFileSync("../db/products.json", JSON.stringify(products,null,' '));
		res.redirect("/products");
    },
    
    profile: (req, res) =>
    {
	res.render("profile");
    },
    
    plist: (req, res) =>
    {
	res.render("plist", {productos_lista: products});
    },
	destroy: (req, res) =>{

		let idProductoSeleccionado = req.params.id;

		let products2 = products.filter(function(element){
			return element.id!=idProductoSeleccionado;
		})

		fs.writeFileSync("../db/products.json", JSON.stringify(products2,null,' '));

	    res.redirect('/products');

    },

};

module.exports = controller;
