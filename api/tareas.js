const { Tarea } = require("../models")

// POST
function crearTarea(req, res) {
    Tarea.create(req.body)
    .then(nuevaTarea => {
        res.status(201).json(nuevaTarea)
    })
    .catch(err => {
        res.status(400).json(err.message)
    })
}

// GET
function leerTareas(req, res) {
    Tarea.findAll()
    .then(tarea => {
        res.json(tarea);
    })
    .catch(err => {
        res.status(400).json(err.message)
    })
}

// GET
function leerTarea(req, res) {
    const id = req.params.id;
    Tarea.findByPk(id)
    .then(tarea => {
        if(tarea) {
            res.json(tarea);
        } else {
            res.status(404).json("Esta tarea no existe");
        }
    })
    .catch(err => {
        res.status(400).json(err.message)
    })
}

// PUT
function modificarTarea(req, res) {
    const {id} = req.params;
    const datos = req.body;
    Tarea.findOne({where: {id}})
    .then(tareaParaModificar => {
        if(tareaParaModificar) {
            Object.assign(tareaParaModificar, datos);
            tareaParaModificar.save()
            .then(() => res.json(tareaParaModificar))
        } else {
            res.status(404).json("Esta tarea no existe");
        }
    })
    .catch(err => {
        res.status(400).json(err.message)
    })
}

// DELETE
function eliminarTarea(req, res) {
    const {id} = req.params;
    Tarea.findOne({where: {id}})
    .then(tareaParaEliminar => {
        if(tareaParaEliminar) {
            tareaParaEliminar.destroy()
            .then(() => res.status(204).json())
        } else {
            res.status(404).json("Esta tarea no existe");
        }
    })
    .catch(err => {
        res.status(400).json(err.message)
    })
}

module.exports = {
    crearTarea, 
    leerTarea,
    leerTareas,
    modificarTarea,
    eliminarTarea
}