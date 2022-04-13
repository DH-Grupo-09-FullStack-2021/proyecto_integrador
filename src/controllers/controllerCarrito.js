const express = require('express');
const db = require('../basedatos');
const products = require('../dbProductos');

const controllerCarrito =
{
    cart: (req, res) =>
    {
		if (typeof req.session.user !== 'undefined')
			(async () => {
				/* no es una verificacion segura ya que no checkea el pwd */
				let usrc = await db.user.findOne({where: {email: req.session.user.email}});
				if (usrc !== null)
				{
					/* se podria usar req.session.user.id en cambio y no checkear nada */
					let prodscarrito = await db.compra.findAll({where: {userId: usrc.id}});
					let prodlista = [], total = 0;
					for (let i = 0; i < prodscarrito.length; i++)
					{
						prodlista.push(products[prodscarrito[i].productId - 1]);
						prodlista[i].cantidad = prodscarrito[i].cantidad;
						total += prodlista[i].price * prodscarrito[i].cantidad;
					}

					return res.render("cart", {productos_lista: prodlista, infouser: req.session.user, totalapagar: total});
				}
				else
					return res.render("not-found", {errno: 401, errmsg: "Registrese para acceder a esta pagina"});
			})();
		else
			return res.render("not-found", {errno: 401, errmsg: "Registrese para acceder a esta pagina"});
    },

    cartPOST: (req, res) =>
    {
		(async () => {
			let usrc = await db.user.findOne({where: {email: req.session.user.email}});
			if (usrc !== null)
			{
				let [nueva_compra, created] = await db.compra.findOrCreate({
					where: {
						productId: req.params.id,
						userId: usrc.id},
						defaults: {
							cantidad: 1
					}});
		
			if (!created)
			{
				nueva_compra.cantidad += 1;
				nueva_compra.save();
			}

			return res.redirect("/cart");
			}
		})();
    }
};

module.exports = controllerCarrito;