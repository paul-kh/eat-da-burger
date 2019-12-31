const db = require("../models");

module.exports = function (app) {
    // Uses app to set up routes

    // route for user to add a new burger in DB
    app.post("/burgers", async function (req, res) {
        const burger = await db.Burger.create(
            {
                name: req.body.name,
                isDevoured: req.body.isDevoured
            }
        );
        res.json(burger);
        console.log("Name: " + req.body.name);
        console.log("isDevoured: " + req.body.isDevoured);
    });
    // route to get all the burgers from DB
    app.get("/api/burgers", (req, res) => {
        db.Burger.findAll({}).then(burger => {
            res.json(burger);
        });
    });
    // route to updage burger in DB
    app.post("/api/burgers", async function (req, res) {
        console.log("Burger ID:", req.body.id);
        const burger = await db.Burger.update(
            { isDevoured: '1' },
            { where: { id: req.body.id } }
        );
        res.json(burger);
    });
}