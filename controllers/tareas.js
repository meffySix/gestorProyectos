const { Tarea, Intervencion, Usuario } = require("../models/tareas");
const moment = require("moment");

function mostrarTarea(req, res) {
    const id = req.params.id;
    Tarea.findByPk(id, {include: [Intervencion]})
    .then(tarea => {
        res.render("tarea", {
            tarea: {
                link: "/tareas/" + tarea.id, 
                estado: tarea.fecha_fin? "Finalizado" : "Pendiente", 
                intervenciones: tarea.intervencions, 
                iniciada: tarea.intervencions.some(x => x.fin==null), 
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