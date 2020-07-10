function dashboard(req, res) {
    // const usuario = req.params;
    if (usuario) {
        res.render("/dashboard")
    } else {
        res.redirect("/login");   
    }
}

module.exports = {
    dashboard
}