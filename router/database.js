const router = require("express").Router();
const { readdirSync, mkdirSync, rmSync, renameSync } = require("fs");
const { join } = require("path");

router.get("/", (req, res) => {
    try {
        res.json(readdirSync(join(__dirname, "..", "database")));
    } catch (err) {
        res.status(500).send(err);
    }
}).post("/", (req, res) => {
    try {
        mkdirSync(join(__dirname, "..", "database", req.body.name));
        res.end();
    } catch (err) {
        res.status(500).send(err);
    }
}).delete("/:name", (req, res) => {
    try {
        rmSync(join(__dirname, "..", "database", req.params.name), { recursive: true });
        res.end();
    } catch (err) {
        res.status(500).send(err);
    }
}).put("/:name", (req, res) => {
    try {
        renameSync(join(__dirname, "..", "database", req.params.name), join(__dirname, "..", "database", req.body.name));
        res.end();
    } catch (err) {
        res.status(500).send(err);
    }
});
module.exports = router;
