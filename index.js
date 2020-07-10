//separar el proyecto en módulos para cada parte importante

require("dotenv").config();
const express = require ("express");
const {Usuario, Rol, Proyecto, Tarea, Intervencion} = require("./models");
const {login} = require("./controllers/autenticacion");

const app = express();

//motor de plantillas: app.set determina el funcionamiento de express
//en qué carpeta están las plantillas de las vistas:
app.set("views", "./views");
//qué motor de plantillas se va a utilizar:
app.set("view engine", "ejs");

//definición de las rutas:
app.get("/login", (req, res) => res.render("login"));
app.post("/login", login);

app.listen(3000);