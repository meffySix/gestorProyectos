const {Usuario, Rol} = require("../models");
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

// next se utiliza para middleware
function controlAcceso(permiso) {
    return function (req, res, next) {
        const usuario = req.session.usuario;
        if (usuario) {
            Rol.findOne({where: {id = usuario.rolId}})
            .then(rol => {
                // si el (permiso) está registrado en la base de datos -> rols -> permisos [indexOf es distinto de -1]
                if (rol.permisos.indexOf(permiso) != -1) {
                    next();        
                } else {
                    res.status(403).send("Permiso Denegado");
                }
            })
        } else {
            res.redirect("/login");
        }
    }
}

module.exports = {
    login, 
    controlAcceso
}