const express = require('express');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
    res.sendFile((__dirname + '/views/index.html'));  
});

app.get('/register', (req, res) => {
    res.sendFile((__dirname + '/views/register.html'));
});

app.get('/login', (req, res) => {
    res.sendFile((__dirname + '/views/login.html'));
});

app.get('/product', (req, res) => {
    res.sendFile((__dirname + '/views/product.html'));
});

app.get('/cart', (req, res) => {
    res.sendFile((__dirname + '/views/cart.html'));
});

app.use(express.static(path.join(__dirname, '/public')));  

app.listen(3000,() => console.log('El servidor funciona'));
