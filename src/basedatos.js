const Sequelize = require('sequelize');

const sequelize = new Sequelize('mariadb://tpdhg9:Rkfp@Vf7mXBBDd4@mysql-tpdhg9.alwaysdata.net:3306/tpdhg9_trabajointegrador');

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

