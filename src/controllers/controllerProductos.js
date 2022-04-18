const express = require('express');
const db = require('../basedatos');
const products = require('../dbProductos');

const controllerProductos =
{
    product: (req, res) =>
    {
		let producto = null;

		if (req.params.id <= products.length)
			producto = products[req.params.id - 1];

		if (producto === null)
			return res.render('not-found', {errno: 404, errmsg: "El indice no corresponde a ningun producto"});

		let prodlist = [];

		for (let i = 0; i < 4; i++)
		{
			let rnd_prod = products[Math.floor(Math.random() * (products.length))];
			if (parseInt(rnd_prod.id) != parseInt(producto.id) && (prodlist.indexOf(rnd_prod) === -1))
				prodlist.push(rnd_prod);
			else
				i--;
		}

		res.render("product", {product: producto, productos_lista: prodlist});
    },
    
    submit: (req, res) =>
    {
		res.render("submit");
    },
    
    submitPOST: (req, res) =>
    {

			(async () => {
				let p = await db.product.findOne({where: {name: req.body.nombreproducto}});
				if (p === null)
				{
					const newprod = db.product.build({
						name: req.body.nombreproducto,
						price: req.body.valorproducto,
						maker: req.body.fabricadorproducto,
						desc: req.body.descprod,
						img: req.file.filename
					});

				newprod.save();
	
				return res.redirect("/products");
				} else
					return res.render("submit", { errors: {
						nombreproducto: {
						msg: "Ya existe un producto con este nombre en la base de datos",
						param: "nombreproducto",
						value: req.body.nombreproducto,
						location: 'body'
					}}, old: req.body});
			})();

    },
    
    editar: (req, res) =>
    {
		let producto = null;

		for (let i = 0; i < products.length; i++)
		{
			if (products[i].id == req.params.id)
				producto = products[i];
		}

		if (producto === null)
			return res.render('not-found', {errno: 404, errmsg: "El indice no corresponde a ningun producto"});
		else
			return res.render("editar", {producto: producto});
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

					(async () => {
						p.save();
					})();

					break;
				}
			}
	
			res.redirect("/products");
    },
    
    plist: (req, res) =>
    {
		res.render("plist", {productos_lista: products});
    },

    destroy: (req, res) =>
    {
		let producto = null;

		for (let i = 0; i < products.length; i++)
		{
			if (products[i].id == req.params.id)
				producto = products[i];
		}
		
		if (producto === null)
			return res.render('not-found', {errno: 404, errmsg: "El indice no corresponde a ningun producto"});

		products.splice(products.indexOf(producto), 1);

		(async () => {
			let p = await db.product.findByPk(req.params.id);
			p.destroy();
		})();

		return res.redirect('/products');
    },

    api: (req, res) =>
    {
	(async () =>
	 {
	     let productslist = [];
	     const {count, rows} = await db.product.findAndCountAll();
	     rows.forEach(product =>
			  {
			      productslist.push(product.toJSON());
			  });
	     res.send({count: count, products: productslist});
	 })();
    },

    apiID: (req, res) =>
    {
	(async () => {
	    let p = await db.product.findByPk(req.params.id);
	    let c = await db.compra.findAll({where: {productId: req.params.id}});
	    res.send({product: p.toJSON(), compras: c});
	})();
    }
};

module.exports = controllerProductos;
