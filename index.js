const express = require("express");
const fs = require("fs");
const { MongoClient } = require("mongodb");

// Start express
const app = express();

// Include static files in app
app.use(express.static("static"));

// MongoDB connection URI
const URI = JSON.parse(fs.readFileSync("database-user.json"))["uri"];

// Connect to database
const mongoClient = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.get("/", (req, res) => {
    res.sendFile("static/html/index.html", {root: __dirname});
});

app.get("/getText", (req, res) => {
    res.send("Hi");

    mongoClient.connect((err, db) => {
        const collection = mongoClient.db(
            JSON.parse(fs.readFileSync("database-user.json"))["database-name"]).collection(
            JSON.parse(fs.readFileSync("database-user.json"))["collection-name"]);

        objectToInsert = {title: "Manually Added Post Directly to Database", body: "Ha, I added this post directly to the database instead of having some programming logic."};

        collection.insertOne(objectToInsert, (err, res) => {
            if (err) {
                throw err;
            }
            console.log("Document inserted");
            mongoClient.close();
        });
    });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log("Listening on PORT " + PORT + ".....");
});
