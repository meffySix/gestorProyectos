function dashboard(req, res) {
    //información de sesión de las cookies (cookie-session):
    const usuario = req.session.usuario;
    res.render("dashboard", {usuario})
}

module.exports = {
    dashboard
}