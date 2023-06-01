const express = require("express");
const { join } = require("path")
const app = express();
let port = process.env.PORT || 3000;

app.use(express.static("gui"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('views', join(__dirname, "gui", "views"));
app.set('view engine', 'ejs');

app.use("/api/query", require("./router/query"));
app.use("/api/database", require("./router/database"));
app.use("/", require("./router/gui"));

app.listen(port, () => {
    console.log("http://127.0.0.1:3000")
});
