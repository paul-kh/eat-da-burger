// *********************************************************************************
// server.js - Thi8s file is the initial starting point for the Node/Express server.
//
//**********************************************************************************
// *** Dependencies
//==================================================================================
const express = require("express");

// Sets up the Express App
// =================================================================================
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({extend:true}));
app.use(express.json());

// Static director
app.use(express.static("public"));

// Routes
// =================================================================================
require("./routes/routes.js")(app);

// Requiring table models for syncing
const db = require("./models");


// Syncing our sequalize models and then starting our Express App
// =================================================================================
db.sequelize.sync().then(function(){
    app.listen(PORT, function(){
        console.log("App is listening on port " + PORT);
        db.Burger.update(
            { name: 'Double cheese beef burger' },
            { where: { id: 2 } }
        );
        db.Burger.update(
            { name: 'Cheese bacon burger' },
            { where: { id: 3 } }
        );
    });
});

