const sequelize = require("./db");
const Usuario = require("./usuarios");
const Rol = require("./roles");
const Proyecto = require("./proyectos");
const Tarea = require("./tareas");
const Intervencion = require("./intervencion");

// Definición de las relaciones entre entidades (1-N, N-1 o N-M)
Usuario.belongsToMany(Proyecto, {through: "participacione"});
Proyecto.belongsToMany(Usuario, {through: "participacione", as: "participantes"});
Proyecto.hasMany(Tarea);
Tarea.belongsToMany(Usuario, {through: "asignacione"});
// para poder comprobar que Tareas pertenecen a un Usuario (ésto no cambiará la arquitectura de la base de datos):
Usuario.belongsToMany(Tarea, {through: "asignacione"});
// Para la siguiente relación: en "as" establecemos una asignación para los campos y en "through" añadimos una tabla nuestra
    // Tarea.belongsToMany(Usuario, {as: "intervencione", through: Intervencion});
Tarea.hasMany(Intervencion, {as: "intervencione"});
Intervencion.belongsTo(Usuario);
Intervencion.belongsTo(Tarea);
Usuario.belongsTo(Rol);
Rol.hasMany(Rol, {as: "heredados"});
// Esto creará nuevas tablas: "participacione", "asignacione" e "intervencions".

sequelize
    .authenticate()
    .then(() => {
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
    Tarea, 
    Intervencion
}