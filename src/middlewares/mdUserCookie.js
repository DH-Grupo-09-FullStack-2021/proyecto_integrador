const fs = require('fs');
const path = require('path');
const db = require('../basedatos');

const userCookie = async (req,res,next)=>{
    res.locals.isUserLogged=false;
    if(req.cookies.email !==undefined){
	await db.user.findOne({ where: { email: req.cookies.email }}).then(p =>
		{
		    const userTologin = p;
		    req.session.user=userTologin;
		    res.locals.isUserLogged=true;
		});
        
    }
    next();

}
module.exports= userCookie
