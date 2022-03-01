const fs = require('fs');
const path = require('path');
const userDB= path.resolve(__dirname, '../db/users.json');

const users = JSON.parse(fs.readFileSync(userDB,"utf8"))


const userCookie =(req,res,next)=>{
    res.locals.isUserLogged=false;
    if(req.cookies.email !==undefined){
        const userTologin = users.find(oneUser=> oneUser.email===req.cookies.email);
        req.session.user=userTologin;
        res.locals.isUserLogged=true;
    }
    next();

}
module.exports= userCookie