const express = require('express');
const db = require('../basedatos');
const products = require('../dbProductos');

const controllerMain =
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
    }
};

module.exports = controllerMain;
