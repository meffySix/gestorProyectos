const {Usuario, Tarea} = require("../models");
const moment = require("moment");

/**
 * Esta función es un controlador de Express que se encarga de mostrar las 
 * tareas asignadas a un usuario en concreto.
 * 
 * @param {*} req Contiene los datos de la petición, entre los cuales está el ID del usuario. 
 * @param {*} res Respuesta a la petición.
 */
function dashboard(req, res) {
    // .session -> información de sesión de las cookies (cookie-session):
    const usuario = req.session.usuario;
    Usuario.findByPk(usuario.id, {
        include: {model: Tarea, as: "tareas"}
    })
    .then(usuario => {
        // pillamos las tareas y aplicamos lo siguiente a todas ellas (map):
        const tarea = usuario.tareas.map(tarea => {
            return {
                // recogemos los parámetros de la base de datos (nombre, fecha_inicio, fecha_vencimiento) y las definimos
                // una por una, siendo las fechas pasadas por la librería "moment" para mostrar solo (DD/MM/YYYY)
                nombre: tarea.nombre,
                link: "/tareas/" + tarea.id, 
                fecha_inicio: moment(tarea.fecha_inicio).format("DD/MM/YYYY"), 
                fecha_vencimiento: tarea.fecha_vencimiento && moment(tarea.fecha_vencimiento).format("DD/MM/YYYY")
            }
        })
        res.render("dashboard", {usuario, tarea})
    }) 
}

module.exports = {
    dashboard
}