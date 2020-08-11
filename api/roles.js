const { Rol } = require("../models")

// POST
function crearRol(req, res) {
    Rol.create(req.body)
    .then(nuevoRol => {
        res.status(201).json(nuevoRol)
    })
    .catch(err => {
        res.status(400).json(err.message)
    })
}

// GET
function leerRoles(req, res) {
    Rol.findAll()
    .then(rol => {
        res.json(rol);
    })
    .catch(err => {
        res.status(400).json(err.message)
    })
}

// GET
function leerRol(req, res) {
    const id = req.params.id;
    Rol.findByPk(id)
    .then(rol => {
        if(rol) {
            res.json(rol);
        } else {
            res.status(404).json("Este rol no existe");
        }
    })
    .catch(err => {
        res.status(400).json(err.message)
    })
}

// PUT
function modificarRol(req, res) {
    const {id} = req.params;
    const datos = req.body;
    Rol.findOne({where: {id}})
    .then(rolParaModificar => {
        if(rolParaModificar) {
            Object.assign(rolParaModificar, datos);
            rolParaModificar.save()
            .then(() => res.json(rolParaModificar))
        } else {
            res.status(404).json("Este rol no existe");
        }
    })
    .catch(err => {
        res.status(400).json(err.message)
    })
}

// DELETE
function eliminarRol(req, res) {
    const {id} = req.params;
    Rol.findOne({where: {id}})
    .then(rolParaEliminar => {
        if(rolParaEliminar) {
            rolParaEliminar.destroy()
            .then(() => res.status(204).json())
        } else {
            res.status(404).json("Este rol no existe");
        }
    })
    .catch(err => {
        res.status(400).json(err.message)
    })
}

module.exports = {
    crearRol, 
    leerRol,
    leerRoles,
    modificarRol,
    eliminarRol
}