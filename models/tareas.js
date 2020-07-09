const Sequelize = require("sequelize");
const sequelize = require("./db");

const Tarea = sequelize.define("tarea", {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true}, 
    nombre: {type: Sequelize.STRING, allowNull: false}, 
    fecha_inicio: {type: Sequelize.DATE, allowNull: false}, 
    fecha_fin: {type: Sequelize.DATE, allowNull: true}, 
    fecha_vencimiento: {type: Sequelize.DATE, allowNull: true}
});

module.exports = Tarea;