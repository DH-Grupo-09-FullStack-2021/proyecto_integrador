const express = require('express');

const controller =
{
    index: (req, res) =>
    {
	res.render("index");
    },

    product: (req, res) =>
    {
	res.render("product");
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
	res.render("plist");
    },
/*
    : (req, res) =>
    {
	res.render("");
    },
*/
};

module.exports = controller;
