const {Proyecto, Usuario, Tarea} = require("../models");

// POST
function crearProyecto(req, res) {
    const proyecto = req.body;
    Proyecto.create(proyecto)
    .then(nuevoProyecto => {
        res.status(201).json(nuevoProyecto)
    })
    .catch(err => {
        res.status(400).json(err.message)
    })
}

// GET
function leerProyectos(req, res) {
    Proyecto.findAll()
    .then(proyectos => {
        res.json(proyectos);
    })
    .catch(err => {
        res.status(400).json(err.message)
    })
}

// GET
function leerProyecto(req, res) {
    const id = req.params.id;
    Proyecto.findByPk(id, {
        include: ["participantes", Tarea]
    })
    .then(proyecto => {
        if(proyecto) {
            res.json(proyecto);
        } else {
            res.status(404).json("Este proyecto no existe");
        }
    })
    .catch(err => {
        res.status(400).json(err.message)
    })
}

// PUT
function modificarProyecto(req, res) {
    const {id} = req.params;
    const datos = req.body;
    Proyecto.findOne({where: {id}})
    .then(proyectoParaModificar => {
        if(proyectoParaModificar) {
            Object.assign(proyectoParaModificar, datos);
            proyectoParaModificar.save()
            .then(() => res.json(proyectoParaModificar))
        } else {
            res.status(404).json("Este proyecto no existe");
        }
    })
    .catch(err => {
        res.status(400).json(err.message)
    })
}

// DELETE
function eliminarProyecto(req, res) {
    const {id} = req.params;
    Proyecto.findOne({where: {id}})
    .then(proyectoParaEliminar => {
        if(proyectoParaEliminar) {
            proyectoParaEliminar.destroy()
            .then(() => res.status(204).json())
        } else {
            res.status(404).json("Este proyecto no existe");
        }
    })
    .catch(err => {
        res.status(400).json(err.message)
    })
}

module.exports = {
    crearProyecto, 
    leerProyecto, 
    leerProyectos, 
    modificarProyecto, 
    eliminarProyecto
}