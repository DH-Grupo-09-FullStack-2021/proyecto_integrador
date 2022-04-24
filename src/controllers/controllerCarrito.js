const express = require('express');
const db = require('../basedatos');

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
                    let prodscarrito = [], prodlista = [], total = 0;
                    prodscarrito = await db.compra.findAll({where: {userId: usrc.id}});
                    if (prodscarrito !== null)
                    {
                        for (let i = 0; i < prodscarrito.length; i++)
                        {
                            let tempp = await db.product.findOne({where: {id: prodscarrito[i].productId}});
                            tempp.cantidad = prodscarrito[i].cantidad;
                            prodlista.push(tempp);
                            total += prodscarrito[i].cantidad * tempp.price;
                        }
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
        if (typeof(req.session.user) == 'undefined')
            return res.redirect("/register");

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
    },

    cartDELETE: (req, res) =>
    {
        (async () => {
            let usrc = await db.user.findOne({where: {email: req.session.user.email}});
            if (usrc !== null)
            {
                let chau_compra = await db.compra.findOne({
                    where: {
                        productId: req.params.id,
                        userId: usrc.id}});
                
                await chau_compra.destroy();
                
                return res.redirect("/cart");
            }
        })();
    }
};

module.exports = controllerCarrito;
