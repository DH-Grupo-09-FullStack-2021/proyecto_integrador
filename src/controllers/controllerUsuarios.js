const express = require('express');
const bcrypt = require('bcryptjs')
const db = require('../basedatos');

const controllerUsuarios =
{
    login: (req, res) =>
    {
        res.render("login");
    },

    loginPOST:(req,res)=>
    {       
        (async () => {
            let errors = {};

            if (req.body.emailusuario == "")
                errors.emailusuario = "Debe ingresar un email registrado";

            if (req.body.contrasenausuario == "")
                errors.contrasenausuario = "Debe ingresar una contraseña";

            if (Object.keys(errors).length == 0)
            {
                const usertologin = await db.user.findOne({
                    where: {email: req.body.emailusuario}});
            
                if (usertologin !== null)
                {
                    if (!bcrypt.compareSync(req.body.contrasenausuario, usertologin.password))
                    {
                        req.body.contrasenausuario = null;
                        return res.render("login", {errors: {contrasenausuario: "Contraseña incorrecta"}, old: req.body});
                    }
                    else
                    {
                        req.session.user = usertologin;
                        
                        res.cookie("email", usertologin.email,{maxAge:1000*60}*30)
                        
                        return res.redirect("profile");
                    }
                }
                else
                    return res.render("login", {errors: {emailusuario: "Este E-mail nunca ha sido registrado"}, old: req.body});
            }
            else
                return res.render("login", {errors: errors, old: req.body});
        })();
    },
    
    register: (req, res) =>
    {
        res.render("register", {redirect_prod: req.query.id_producto});
    },

    registerPOST: (req, res) =>
    {
        let errors = {};

        if (req.body.nombreusuario.trim() == "")
            errors.nombreusuario = "Debe ingresar un nombre de usuario";

        if (req.body.nombreusuario.trim().length < 8)
            errors.nombreusuario = "El nombre de usuario debe tener al menos 8 caracteres";

        if (req.body.nombreusuario.trim().length > 32)
            errors.nombreusuario = "El nombre de usuario debe respetar el maximo de 32 caracteres";

        if (req.body.emailusuario.trim() == "")
            errors.emailusuario = "Debe ingresar una direccion de email";

        if (!req.body.emailusuario.trim().match("^.+@.+$"))
            errors.emailusuario = "Debe ingresar una direccion de email valida";

        if (req.body.contrasenausuario.trim() == "")
            errors.contrasenausuario = "Debe ingresar una constraseña";
        
        if (req.body.contrasenausuario.trim().length < 8)
            errors.contrasenausuario = "La contraseña debe tener al menos 8 caracteres";

        if (req.body.contrasenausuario.trim().length > 32)
            errors.contrasenausuario = "La contraseña debe respetar el maximo de 32 caracteres";
        
        if (req.body.contrasenausuario.trim() !== req.body.contrasenausuario2.trim())
        {
            req.body.contrasenausuario2 = null;
            errors.contrasenausuario2 = "Las contraseñas no coinciden";
        }
        
        if (Object.keys(errors).length == 0)
        {
            (async () => {
                let u = await db.user.findOne({where: {username: req.body.nombreusuario.trim()}});
                if (u === null)
                {
                    let archivo_imagen = null;
        
                    if (req.file)               
                        archivo_imagen = req.file.filename;

                    const [new_user, created] = await db.user.findOrCreate({
                        where: {email: req.body.emailusuario.trim()},
                        defaults: {
                            username: req.body.nombreusuario.trim(),
                            password: bcrypt.hashSync(req.body.contrasenausuario.trim(), 10),
                            img: archivo_imagen
                        }});
                    
                    if (created)
                    {
                        req.session.user = new_user;
                        
                        res.cookie("email", new_user.email,{maxAge:1000*60}*30)

                        if (typeof(req.query.id_producto) == "undefined")
                            return res.redirect("profile");
                        else
                            return res.redirect("/cart/add/" + req.query.id_producto + "");
                    }
                    else
                        return res.render("register", {errors: {emailusuario:  "Este E-mail ya esta registrado"}, old: req.body});
                }
                else
                    return res.render("register", {errors: {nombreusuario: "Este nombre de usuario ya se encuentra en uso"}, old: req.body});
            })();
        }
        else
            return res.render("register", {errors: errors, old: req.body});
    },
    
    profile: (req, res) =>
    {
        return res.render("profile",{userData:req.session.user});
    },
    
    logout: (req,res) =>
    {
        req.session.destroy();
        res.clearCookie("email");
        return res.redirect("/")        
    },

    api: (req, res) =>
    {
        (async () =>
         {
             let userlist = [];
             const {count, rows} = await db.user.findAndCountAll();
             rows.forEach(user =>
                          {
                              var tempuser = user.toJSON();
                              delete tempuser.password;
                              userlist.push(tempuser);
                          });
             res.send({count: count, users: userlist});
         })();
    },

    apiID: (req, res) =>
    {
        (async () => {
            let u = await db.user.findByPk(req.params.id);
            let c = await db.compra.findAll({where: {userId: req.params.id}});
            let compras = [];
            c.forEach(compra =>
                         {
                             compras.push(compra.toJSON());
                         });
            res.send({user: u.toJSON(), compras: compras});
        })();
    },

    apiLastCreated: (req, res) =>
    {
        (async () => {
            let tempuser, users = await db.user.findAll({limit: 1, order: [['createdAt', 'DESC']]});
             users.forEach(user =>
                          {
                              tempuser = user.toJSON();
                              delete tempuser.password;
                          });
            res.send({lastUserCreated: tempuser});
         })();
    }
};

module.exports = controllerUsuarios;
