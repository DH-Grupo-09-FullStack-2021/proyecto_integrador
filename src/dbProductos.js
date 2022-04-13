const db = require('./basedatos');

let products = [];
db.product.findAll().then(p => { products = p; });

module.exports = products;