const router = require("express").Router();

router.get("/", (req, res) => {
    res.render("index", {
        title: "Al-Bashir Database | home",
        router: "home",
        css: "./css/home.css"
    });
}).get("/docs", (req, res) => {
    res.send("docs")
}).get("/scema", (req, res) => {
    res.send("scema")
}).get("/command", (req, res) => {
    res.render("index", {
        title: "Al-Bashir Database | query",
        router: "query",
        css: "./css/query.css"
    });
}).get("/dashboard", (req, res) => {
    res.render("index", {
        title: "Al-Bashir Database | dashboard",
        router: "dashboard",
        css: "./css/dashboard.css"
    });
}).get("/*", (req, res) => {
    res.render("index", {
        title: "Al-Bashir Database | 404",
        router: "404",
        css: "./css/404.css"
    });
});
module.exports = router;