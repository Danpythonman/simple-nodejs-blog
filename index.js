const express = require("express");

const app = express();

app.use(express.static("static"));

app.get("/", (req, res) => {
    res.sendFile("static/html/index.html", {root: __dirname});
});

app.get("/getText", (req, res) => {
    res.send("Hi");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log("Listening on PORT " + PORT + ".....");
});
