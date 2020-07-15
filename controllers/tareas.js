const { Tarea, Intervencion, Usuario } = require("../models");
const moment = require("moment");

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



module.exports = {
    mostrarTarea
}