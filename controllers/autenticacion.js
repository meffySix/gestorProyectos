const {Usuario} = require("../models");
const md5 = require("md5");

function login(req, res) {
    const {email, password} = req.body;

    // Buscamos un usuario en la base de datos que coincida con 
    // el email y que la huella md5 de la contraseña coincida también.
    Usuario.findOne({where: {email, password: md5(password)}})
    .then(usuario => {
        if (usuario) {
            req.session.usuario = usuario;
            res.redirect("/");
        } else {
            res.render("login", {mensaje: "Usuario o contraseña incorrectos."});
        }
    })
}

module.exports = {
    login
}