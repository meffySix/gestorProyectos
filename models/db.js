const Sequelize = require("sequelize");

const sequelize = new Sequelize("gestor_proyectos", "root", "", {
    host: "localhost",
    dialect: "mariadb"
});

module.exports = sequelize;