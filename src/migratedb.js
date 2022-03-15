/* NO INCLUIR ESTE ARCHIVO */
/*  SOLO para uso directo  */

if (!(require.main === module))
    console.log("No incluir " + __basename + __filename + " SOLO existe para uso directo");
else
{   
    const db = require('./basedatos');
    const fs = require('fs');
    const path = require('path');
    
    let products = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/products.json'), 'utf-8'));
    const userDB= path.resolve(__dirname, '../db/users.json');
    
    const users = JSON.parse(fs.readFileSync(userDB,"utf8"))
    
    
    products.forEach(producto =>
    {
	db.product.create(
	{
	    name: producto.name,
	    price: producto.price,
	    img: producto.img,
	    desc: producto.desc,
	    maker: producto.maker
	});
    });
    
    users.forEach(user =>
    {
	db.user.create(
	{
	    username: user.username,
	    password: user.password,
	    email: user.email,
	    img: user.img
	});
    });
}
