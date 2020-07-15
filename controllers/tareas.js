const Tarea = require("../models/tareas");

function mostrarTarea(req, res) {
    const id = req.params.id;
    Tarea.findOne({where: {id}})
    .then(tarea => {
        const tarea = tareas.map(tarea => {
            return {
                id: tarea.id,
                nombre: tarea.nombre,
                link: "/tareas/" + tarea.id, 
                fecha_inicio: moment(tarea.fecha_inicio).format("DD/MM/YYYY"), 
                fecha_fin: tarea.fecha_fin && moment(tarea.fecha_fin).format("DD/MM/YYYY"), 
                fecha_vencimiento: tarea.fecha_vencimiento && moment(tarea.fecha_vencimiento).format("DD/MM/YYYY")
            }
        })
        res.render("tarea", {tarea})
    })
}

module.exports = {
    mostrarTarea
}