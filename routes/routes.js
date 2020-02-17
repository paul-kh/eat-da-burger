const db = require("../models");

module.exports = function (app) {
    // Uses app to set up routes

    // route for user to add a new burger in DB
    app.post("/burgers", async function (req, res) {
        try {
            const burger = await db.Burger.create(
                {
                    name: req.body.name,
                    isDevoured: req.body.isDevoured
                }
            );
            res.json(burger);
        }
        catch (error) {
            console.log(error);
        }
    });

    // route to get all the burgers from DB
    app.get("/api/burgers", (req, res) => {
        db.Burger.findAll({}).then(burger => {
            res.json(burger);
        }).catch(function (error) { console.log(error) });
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
    // route to updage burger in DB
    app.delete("/api/burgers/:id", async function (req, res) {
        console.log("params:", req.params);
        const burger = await db.Burger.destroy(
            { where: { id: req.params.id } }
        );
        res.json(burger);
    });
}