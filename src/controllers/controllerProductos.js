const express = require('express');
const db = require('../basedatos');

const controllerProductos =
{
    product: (req, res) =>
    {
        (async () => {
            let producto = await db.product.findOne({where: {id: req.params.id}});
            if (producto === null)
                return res.render('not-found', {errno: 404, errmsg: "El indice no corresponde a ningun producto"});

            let prodlist = await db.product.findAll({where: {id: {[db.Op.ne]: req.params.id}}, order: db.Sequelize.literal('rand()'), limit: 4});
            return res.render("product", {product: producto, productos_lista: prodlist});
        })();
    },
    
    submit: (req, res) =>
    {
        res.render("submit");
    },
    
    submitPOST: (req, res) =>
    {   
        (async () => {
            let errors = {};

            if (req.body.nombreproducto.trim() == "")
                errors.nombreproducto = "Debe ingresar el nombre del producto";

            if (req.body.valorproducto == 0)
                errors.valorproducto = "Debe ingresar el valor comercial del producto";

            if (req.body.fabricadorproducto.trim() == "")
                errors.fabricadorproducto = "Debe ingresar el nombre del fabricante del producto";

            if (!req.file.mimetype.match("image.*"))
                errors.imagenprod = "El archivo correspondiente a la imagen del producto debe ser una imagen";

            if (req.file.filename == "")
                errors.imagenprod = "Debe subir una imagen del producto";

            if (req.body.descprod.trim() == "")
                errors.descprod = "Debe ingresar una descripción del producto";

            if (Object.keys(errors).length == 0)
            {
                let p = await db.product.findOne({where: {name: req.body.nombreproducto}});
                if (p === null)
                {
                    const newprod = db.product.build({
                        name: req.body.nombreproducto.trim(),
                        price: req.body.valorproducto,
                        maker: req.body.fabricadorproducto.trim(),
                        desc: req.body.descprod.trim(),
                        img: req.file.filename
                    });
                    
                    newprod.save();
                    
                    return res.redirect("/products");
                }
                else
                    errors.nombreproducto = "Ya existe un producto con este nombre en la base de datos";
            }

            return res.render("submit", {errors: errors, old: req.body});
        })();
    },
    
    editar: (req, res) =>
    {
        (async () => {
            let producto = await db.product.findOne({where: {id: req.params.id}});
            
            if (producto === null)
                return res.render('not-found', {errno: 404, errmsg: "El indice no corresponde a ningun producto"});
            else
                return res.render("editar", {producto: producto});
        })();
    },

    editarPUT: (req, res) =>
    {   
        (async () => {
            let errors = {};

            if (req.body.nombreproducto.trim() == "")
                errors.nombreproducto = "Debe ingresar el nombre del producto";

            if (req.body.valorproducto == 0)
                errors.valorproducto = "Debe ingresar el valor comercial del producto";

            if (req.body.fabricadorproducto.trim() == "")
                errors.fabricadorproducto = "Debe ingresar el nombre del fabricante del producto";

            if (req.body.descprod.trim() == "")
                errors.descprod = "Debe ingresar una descripción del producto";
            
            if (Object.keys(errors).length == 0)
            {
                let p = await db.product.findOne({where: {id: req.params.id}});
                if (p === null)
                    return res.render('not-found', {errno: 404, errmsg: "El indice no corresponde a ningun producto"});

                p.name = req.body.nombreproducto.trim();
                p.price = req.body.valorproducto;
                p.maker = req.body.fabricadorproducto.trim();
                p.desc = req.body.descprod.trim();
                p.save();

                return res.redirect("/products");
            }

            return res.render("editar", {errors: errors, old: req.body});
        })();
    },
    
    plist: (req, res) =>
    {
        (async () => {
            let products = await db.product.findAll({limit: 8});
            return res.render("plist", {productos_lista: products});
        })();
    },

    destroy: (req, res) =>
    {
        (async () => {
            let p = await db.product.findByPk(req.params.id);
            if (p === null)
                return res.render('not-found', {errno: 404, errmsg: "El indice no corresponde a ningun producto"});

            p.destroy();

            return res.redirect('/products');
        })();
    },

    api: (req, res) =>
    {
        (async () => {
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
            let compras = [];
            c.forEach(compra =>
                      {
                          compras.push(compra.toJSON());
                      });
            res.send({product: p.toJSON(), compras: compras});
        })();
    },

    apiLastCreated: (req, res) =>
    {
        (async () => {
            let temprod, products = await db.product.findAll({limit: 1, order: [['createdAt', 'DESC']]});
            products.forEach(product =>
                         {
                             temprod = product.toJSON();
                         });
            res.send({lastProductCreated: temprod});
        })();
    }

};

module.exports = controllerProductos;
