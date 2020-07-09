const sequelize = require ("./db");
const Usuario = require ("./usuarios");
const Rol = require ("./roles");
const Proyecto = require ("./proyectos");
const Tarea = require ("./tareas");

sequelize
    .authenticate()
    .then (() => {
        console.log("Conexión establecida");
        sequelize.sync({alter: true});
    })
    .catch(err => {
        console.error("Error al conectar: ", err);
    });

module.exports = { 
    sequelize, 
    Usuario, 
    Rol, 
    Proyecto, 
    Tarea
}