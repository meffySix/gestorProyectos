function dashboard(req, res) {
    //información de sesión de las cookies (cookie-session):
    const usuario = req.session.usuario;
    if (usuario) {
        res.render("dashboard", {usuario})
    } else {
        res.redirect("/login");   
    }
}

module.exports = {
    dashboard
}