//separar el proyecto en módulos para cada parte importante

require("dotenv").config();
const express = require ("express");
const {Usuario, Rol, Proyecto, Tarea, Intervencion} = require("./models");
const {login} = require("./controllers/autenticacion");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");

const app = express();

//para poder recibir los links (URL):
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cookieSession({
    name: "cookiemonster",
    keys: ["g3oaksj3FHsbdjskwuidniui34534", "doiamwdioSDIMOIo82o7382ODSJSIO"],
    maxAge: 5 * 60 * 1000
}));

//motor de plantillas: app.set determina el funcionamiento de express
//en qué carpeta están las plantillas de las vistas:
app.set("views", "./views");
//qué motor de plantillas se va a utilizar:
app.set("view engine", "ejs");

//definición de las rutas:
app.get("/login", (req, res) => res.render("login"));
app.post("/login", login);
app.get("/", )

app.listen(3000);