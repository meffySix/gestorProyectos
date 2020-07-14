const {Usuario, Tarea} = require("../models");

function dashboard(req, res) {
    // .session -> información de sesión de las cookies (cookie-session):
    const usuario = req.session.usuario;
    Usuario.findByPk(usuario.id, {
        include: {model: Tarea, as: "tareas"}
    })
    .then(usuario => {
        const tarea = usuario.tareas;
        res.render("dashboard", {usuario, tarea})
    }) 
}

module.exports = {
    dashboard
}