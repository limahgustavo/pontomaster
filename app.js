const express = require("express");
const session = require('express-session');
const bodyparse = require('body-parser')
const app = express();
const dotenv = require("dotenv")

// -----------------------------------CONSIFS-------------------------------------------
dotenv.config()
app.use(bodyparse.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static(__dirname));
app.use(session({ secret: 'anythdshdosiauhdasoadasing', resave: true, saveUninitialized: true, maxAge: 360000 }));
// ----------------------------------REQUIRE ROUTES-------------------------------------
const index = require('./routes/routeIndex')
const login = require('./routes/routeAuth')
// ----------------------------------USE ROUTES-----------------------------------------
app.use(index)
app.use(login)
// ---------------------------------LISTEN SERVER---------------------------------------
app.listen(`${process.env.PORT_APPLICATION}`,()=>{
    console.log("SERVE IS RUNNING")
})