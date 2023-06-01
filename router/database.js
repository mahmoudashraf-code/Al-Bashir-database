const router = require("express").Router();
const { readdirSync, mkdirSync, rmSync } = require("fs");
const { join } = require("path");
const { database } = require("./../packages/table")
router.get("/", (req, res) => {
    try {
        res.json(readdirSync(join(__dirname, "..", "database")));
    } catch (err) {
        res.status(500).send(err);
    }
}).post("/", (req, res) => {
    try {
        makeDatabase(req.body);
    } catch (err) {
        res.status(500).send(err);
    }
}).delete("/", (req, res) => {
    try {
        rmSync(join(__dirname, "..", "database", req.body), { recursive: true });
        res.end();
    } catch (err) {
        res.status(500).send(err);
    }
}).put("/", (req, res) => {
    try {
        rmSync(join(__dirname, "..", "database", req.body), { recursive: true });
        makeDatabase(req.body);
    } catch (err) {
        res.status(500).send(err);
    }
});
module.exports = router;

function makeDatabase(scema) {
    mkdirSync(join(__dirname, "..", "database", scema.name));
    database(scema.name, "scema.json").write(JSON.stringify(scema));
    _help(scema.database, scema.tables);
}
function _help(db, tables) {
    for (const table in tables) {
        database(db, `${table}.json`).write(tables[table].data);
    }
}