const multer = require('multer');
const upload = multer({ dest: '../public/img/' });

module.exports = upload;  
