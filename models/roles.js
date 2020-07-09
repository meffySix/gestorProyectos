const Sequelize = require("sequelize");
const sequelize = require("./db");

const Rol = sequelize.define("rol", {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true}, 
    nombre: {type: Sequelize.STRING, allowNull: false}, 
    permisos: {type: Sequelize.STRING(1000), allowNull: true}
});

module.exports = Rol;