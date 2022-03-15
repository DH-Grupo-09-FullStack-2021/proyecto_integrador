const fs = require('fs');
const path = require('path');
const db = require('../basedatos');

let users = [];

const userCookie =(req,res,next)=>{
    res.locals.isUserLogged=false;
    if(req.cookies.email !==undefined){
		db.user.findAll().then(p =>
		{
			users = p;
			const userTologin = users.find(oneUser=> oneUser.email===req.cookies.email);
			req.session.user=userTologin;
			res.locals.isUserLogged=true;
		});
        
    }
    next();

}
module.exports= userCookie
