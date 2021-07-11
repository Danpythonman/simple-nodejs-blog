const fs = require("fs");
const { MongoClient } = require("mongodb");
const signUpSchema = require("../models/user-signup");
const bcrypt = require("bcrypt");

const URI = JSON.parse(fs.readFileSync("./database-user.json"))["uri"];
const dataBaseName = JSON.parse(fs.readFileSync("./database-user.json"))["database-name"];
const collectionName = JSON.parse(fs.readFileSync("./database-user.json"))["users-collection-name"];

/* * * * * * * * * * * * * * * * User signup * * * * * * * * * * * * * * * */

signUp = (req, res) => {
    const validationResult = signUpSchema.validate(req.body);
    if (validationResult.error) {
        res.status(400).send(validationResult.error.details[0].message);
        return;
    }

    bcrypt.hash(req.body.password, 10)
    .then((hashedPassword) => {
        req.body.password = hashedPassword;
    })
    .catch((err) => {
        res.status(500).send("Error with hashing password");
        return;
    });

    const mongoClient = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });

    mongoClient.connect((err, db) => {
        const collection = mongoClient.db(dataBaseName).collection(collectionName);

        collection.insertOne(req.body, (err, mongoResponse) => {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.status(200).send(req.body);
            mongoClient.close();
        });
    });
}

/* * * * * * * * * * * * * * * User login * * * * * * * * * * * * * * */

login = (req, res) => {
    // Authentication is handled by passport module and authenticate-user.js
    // If this function is reached, then authentication was successful, so just send response
    res.status(200).send("Logged in");
}

module.exports = { signUp, login };
