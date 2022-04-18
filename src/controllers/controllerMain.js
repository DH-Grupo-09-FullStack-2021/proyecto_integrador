const express = require('express');
const db = require('../basedatos');

const controllerMain =
{
    index: (req, res) =>
    {
	(async () => {
	    let cuatro_prod = await db.product.findAll({limit: 4, order: db.Sequelize.literal('rand()')});
	    return res.render("index", {productos_lista: cuatro_prod});
	})();
    }
};

module.exports = controllerMain;
