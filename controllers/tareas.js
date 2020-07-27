const { Tarea, Intervencion, Usuario } = require("../models");
const moment = require("moment");

/**
 * Controlador para mostrar la información de una tarea en concreto.
 * La información de la tarea se obtiene mediante una consulta de datos
 * con todas las intervenciones asociadas a dicha tarea.
 * 
 * La consulta trabaja de forma asíncrona, de tal modo que los datos de la tarea
 * se obtienen en una promesa.
 * 
 * Los datos obtenidos de la consulta se visualizan en la vista (tarea.ejs).
 * 
 * @param {*} req Petición, que contiene el parámetro del ID de la tarea. 
 * @param {*} res Respuesta.
 */

function mostrarTarea(req, res) {
    const id = req.params.id;
    // intervencione viene de la relación establecida en el index.js (as: "intervencione"):
    Tarea.findByPk(id, {include: ["intervencione"]})
    .then(tarea => {
        res.render("tarea", {
            tarea: {
                id: tarea.id, 
                nombre: tarea.nombre, 
                link: "/tareas/" + tarea.id, 
                estado: tarea.fecha_fin? "Finalizado" : "Pendiente", 
                intervencione: tarea.intervencione, 
                iniciada: tarea.intervencione.some(x => x.fin==null), 
                fecha_inicio: moment(tarea.fecha_inicio).format("DD/MM/YYYY"), 
                fecha_fin: tarea.fecha_fin && moment(tarea.fecha_fin).format("DD/MM/YYYY"), 
                fecha_vencimiento: tarea.fecha_vencimiento && moment(tarea.fecha_vencimiento).format("DD/MM/YYYY")
            }
        })
    })
}

function registrarAccionTarea(req, res) {
    // params recoge los parámetros de la petición (dirrección...):
    const id = req.params.id;
    const {accion} = req.body;
    Tarea.findByPk(id, {include: [Usuario]})
    // async se utiliza para suplantar el .then por un await antes de los datos recogidos:
    .then(async tarea => {
        const usuario = await Usuario.findByPk(req.session.usuario.id)
        if (accion == "start") {
            await Intervencion.create({usuarioId: usuario.id, tareaId: tarea.id, inicio: new Date()})
        }
        else if (accion == "stop") {
            const intervencion = await Intervencion.findOne({
                where: {usuarioId: usuario.id, tareaId: tarea.id, fin: null}
            })
            intervencion.fin = new Date();
            await intervencion.save();
        }
        else if (accion == "terminar") {
            const intervencion = await Intervencion.findOne({
                where: {usuarioId: usuario.id, tareaId: tarea.id, fin: null}
            })
            if (intervencion) {
                intervencion.fin = new Date();
                await intervencion.save();
            }
            tarea.fecha_fin = new Date();
        }
        return await tarea.save();
    })
    .then(() => {
        res.redirect("/tareas/" + id)
    })
    .catch(err => {
        console.error(err);
        res.status(400).send(err.message)
    })
}

module.exports = {
    mostrarTarea, 
    registrarAccionTarea
}