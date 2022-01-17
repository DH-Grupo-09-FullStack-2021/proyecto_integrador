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

/*
    : (req, res) =>
    {
	res.render("");
    },
*/
};

module.exports = controller;
