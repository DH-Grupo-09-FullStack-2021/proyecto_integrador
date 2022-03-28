const express = require('express');
const path = require('path');
const router = require('./router');
const controller = require('./controller');
const methodOverride= require('method-override');
const session=require('express-session');
const coolieParser= require('cookie-parser')

const app = express();

app.use('/public', express.static(path.resolve(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method')) 
app.use (session({secret:"Identificador de Seguridad", resave: true,saveUninitialized: false,}))
app.use(coolieParser());

const mdUserCookie=require('./middlewares/mdUserCookie.js');
app.use(mdUserCookie)

app.set('view engine', 'ejs');
app.set('views', '../views');

app.use('/', router);
app.use((req,res,next)=>{
    res.status(404).render('not-found')
})

app.listen(process.env.PORT || 3000);
