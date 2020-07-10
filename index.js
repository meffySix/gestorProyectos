require("dotenv").config();
const express = require ("express");
const {Usuario, Rol, Proyecto, Tarea, Intervencion} = require("./models");
const app = express();



app.listen(3000);