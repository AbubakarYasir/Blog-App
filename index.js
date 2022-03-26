const express = require("express");
const bodyParser = require("body-parser");

const port = process.env.PORT || 80;

const app = express();
app.use("/public", express.static(process.cwd() + "/public"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
    res.send("Hello, It's Abubakar Yasir");
});

app.listen(port, function () {
    console.log("Server is started at http://localhost:" + port);
});
