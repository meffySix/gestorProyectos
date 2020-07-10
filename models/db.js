const Sequelize = require("sequelize");

//"process.env" es un proceso de node utilizado para acceder a las variables de entorno
//"dotenv" permite controlar esas variables (npm install --save dotenv)
const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mariadb"
});

module.exports = sequelize;