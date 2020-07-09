const Sequelize = require("sequelize");
const sequelize = require("./db");

const Proyecto = sequelize.define("proyecto", {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true}, 
    nombre: {type: Sequelize.STRING, allowNull: false}, 
    descripcion: {type: Sequelize.TEXT, allowNull: true}, // TEXT es como STRING pero mucho más amplio
    fecha_inicio: {type: Sequelize.DATE, allowNull: false},
    fecha_fin: {type: Sequelize.DATE, allowNull: true}
});

module.exports = Proyecto;