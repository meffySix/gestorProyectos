require("dotenv").config();
const express = require ("express");
// const {Usuario, Rol, Proyecto, Tarea, Intervencion} = require("./models");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");

const {login, controlAcceso} = require("./controllers/autenticacion");
const {dashboard} = require("./controllers/dashboard");
const {mostrarTarea, registrarAccionTarea} = require("./controllers/tareas");
const {crearProyecto, leerProyecto, leerProyectos, modificarProyecto, eliminarProyecto} = require("./api/proyectos");

const app = express();

//para poder recibir los links (URL):
app.use(express.urlencoded({extended: false}));

app.use(cookieParser());
app.use(cookieSession({
    name: "cookiemonster",
    keys: [process.env.KEY1, process.env.KEY2],
    maxAge: process.env.DURACION_COOKIE * 60 * 1000
}));

//motor de plantillas: app.set determina el funcionamiento de express
//en qué carpeta están las plantillas de las vistas:
app.set("views", "./views");
//qué motor de plantillas se va a utilizar:
app.set("view engine", "ejs");

app.use(express.json());

//definición de las rutas:
//si cumple los requisitos de controlAcceso, la función next() permitirá que pase a dashboard
app.get("/", controlAcceso("leer_proyectos_y_tareas_asignados"), dashboard);
app.get("/login", (req, res) => res.render("login"));
app.post("/login", login);

app.get("/tareas/:id", mostrarTarea);
app.post("/tareas/:id", registrarAccionTarea);

app.get("/api/proyectos", leerProyectos);
app.get("/api/proyectos/:id", leerProyecto);
app.post("/api/proyectos", crearProyecto);
app.put("/api/proyectos/:id", modificarProyecto);
app.delete("/api/proyectos/:id", eliminarProyecto);

app.listen(3000);