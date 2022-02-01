const express = require('express');
const path = require('path');
const router = require('./router');
const controller = require('./controller');

const app = express();

app.use('/public', express.static(path.resolve(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', '../views');

app.use('/', router);

app.listen(process.env.PORT || 3000,() => console.log('El servidor funciona'));
