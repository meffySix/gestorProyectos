const { Usuario } = require("../models");

// POST
function crearUsuario(req, res) {
    Usuario.create(req.body)
    .then(nuevoUsuario => {
        res.status(201).json(nuevoUsuario)
    })
    .catch(err => {
        res.status(400).json(err.message)
    })
}

// GET
function leerUsuarios(req, res) {
    Usuario.findAll()
    .then(usuario => {
        res.json(usuario);
    })
    .catch(err => {
        res.status(400).json(err.message)
    })
}

// GET
function leerUsuario(req, res) {
    const id = req.params.id;
    Usuario.findByPk(id)
    .then(usuario => {
        if(usuario) {
            res.json(usuario);
        } else {
            res.status(404).json("Este usuario no existe");
        }
    })
    .catch(err => {
        res.status(400).json(err.message)
    })
}

// PUT
function modificarUsuario(req, res) {
    const {id} = req.params;
    const datos = req.body;
    Usuario.findOne({where: {id}})
    .then(usuarioParaModificar => {
        if(usuarioParaModificar) {
            Object.assign(usuarioParaModificar, datos);
            usuarioParaModificar.save()
            .then(() => res.json(usuarioParaModificar))
        } else {
            res.status(404).json("Este usuario no existe");
        }
    })
    .catch(err => {
        res.status(400).json(err.message)
    })
}

// DELETE
function eliminarUsuario(req, res) {
    const {id} = req.params;
    Usuario.findOne({where: {id}})
    .then(usuarioParaEliminar => {
        if(usuarioParaEliminar) {
            usuarioParaEliminar.destroy()
            .then(() => res.status(204).json())
        } else {
            res.status(404).json("Este usuario no existe");
        }
    })
    .catch(err => {
        res.status(400).json(err.message)
    })
}

module.exports = {
    crearUsuario, 
    leerUsuario,
    leerUsuarios,
    modificarUsuario,
    eliminarUsuario
}