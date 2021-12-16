const express = require('express');
const path = require('path');

const app = express();

app.get('', (req,res) =>{
    res.send("Ahora si entre");  
});

app.get('/inicio', (req,res) =>{
   
    res.sendFile((__dirname + '/views/index.html'));  
});

app.use(express.static(path.join(__dirname, './public')));  



app.listen(505,() => console.log('El servidor funciona'));