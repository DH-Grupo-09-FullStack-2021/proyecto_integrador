const express = require('express');
let products = require('../db/products');

const controller =
{
    index: (req, res) =>
    {
	let cuatro_prod = [];

	for (let i = 0; i < 4; i++)
	{
	    cuatro_prod.push(products.products[Math.floor(Math.random() * (products.products.length))]);
	}
	
	res.render("index", {productos_lista: cuatro_prod});
    },

    product: (req, res) =>
    {
	let producto = 0;

	for (let i = 0; i < products.products.length; i++)
	{
	    if (products.products[i].id == req.params.id)
		producto = products.products[i];
	}

	let prodlist = [];

	for (let i = 0; i < products.products.length; i++)
	{
	    if (products.products[i].id != req.params.id)
		prodlist.push(products.products[i]);
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

    submit: (req, res) =>
    {
	res.render("submit");
    },
    
    editar: (req, res) =>
    {
	res.render("editar");
    },
    
    profile: (req, res) =>
    {
	res.render("profile");
    },
    
    plist: (req, res) =>
    {
	res.render("plist", {productos_lista: products.products});
    },
/*
    : (req, res) =>
    {
	res.render("");
    },
*/
};

module.exports = controller;