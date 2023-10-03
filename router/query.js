const router = require("express").Router();
const { Qdata } = require("./../packages/data");
const { database } = require("./../packages/table");

router.get("/:data", (req, res) => {
    try {
        let data = JSON.parse(req.params.data);
        if (data.table.length == 0 || data.table == undefined) {
            res.status(200).json([]);
        } else if (data.table.length == 1) {
            res.status(200).json(Qdata.filds(database(data.database, data.table[0]).get(), data.filds));
        } else {
            for (let i = 0; i < data.table.length - 1; i++) {
                data.table[0] = Qdata.join(database(data.database, data.table[i]).get(),
                    database(data.database, data, table[i + 1]).get(), data.join[i], data.join[i + 1]);
            }
            res.status(200).json(Qdata.filds(data.table[0], data.filds));
        }
    } catch (err) {
        res.status(500).send(err);
    }
}).post("/", (req, res) => {
    try {
        database(req.body.database, req.body.table).insert(req.body.item);
    } catch (err) {
        res.status(500).send(err);
    }
}).put("/", (req, res) => {
    try {
        database(req.body.database, req.body.table).update(req.body.label, req.body.value, req.body.item)
    } catch (err) {
        res.status(500).send(err);
    }
}).delete("/", (req, res) => {
    try {
        database(req.body.database, req.body.table).delete(req.body.label, req.body.value)
    } catch (err) {
        res.status(500).send(err);
    }
})
module.exports = router;