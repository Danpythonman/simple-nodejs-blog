const fs = require("fs");
const LocalStrategy = require("passport-local").Strategy;
const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

const URI = JSON.parse(fs.readFileSync("./database-user.json"))["uri"];
const dataBaseName = JSON.parse(fs.readFileSync("./database-user.json"))["database-name"];
const collectionName = JSON.parse(fs.readFileSync("./database-user.json"))["users-collection-name"];

authenticateUser = (passport) => {
    passport.use(new LocalStrategy((username, password, done) => {
        const mongoClient = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });

        mongoClient.connect((err, db) => {
            const collection = mongoClient.db(dataBaseName).collection(collectionName);

            if (username.includes("@")) {
                //Username is an email
                collection.findOne({ email: username })
                .then((userObject) => {
                    bcrypt.compare(password, userObject.password)
                    .then((passwordsMatch) => {
                        return (passwordsMatch ? 
                            done(null, userObject) :
                            done(null, false, { message: "Incorrect password" })
                        );
                    })
                    .catch(() => {
                        return done(null, false, { message: "Error with comparing passwords" });
                    })
                })
                .catch(() => {
                    return done(null, false, { message: "Error with retrieving user from database" });
                });
            }

            else {
                // Username is not an email (it is a username (no special characters like '@'))
                collection.findOne({ username: username })
                .then((userObject) => {
                    bcrypt.compare(password, userObject.password)
                    .then((passwordsMatch) => {
                        return (passwordsMatch ? 
                            done(null, userObject) :
                            done(null, false, { message: "Incorrect password" })
                        );
                    })
                    .catch(() => {
                        return done(null, false, { message: "Error with comparing passwords" });
                    })
                })
                .catch(() => {
                    return done(null, false, { message: "Error with retrieving user from database" });
                });
            }
        });
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        const mongoClient = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });

        mongoClient.connect((err, db) => {
            const collection = mongoClient.db(dataBaseName).collection(collectionName);

            collection.findOne({ _id: new ObjectId(id) })
            .then((userObject) => {
                done(null, userObject);
            })
            .catch(() => {
                done(null, false, { message: "Error with retrieving user from database in deserializing" });
            });
        });
    });
}

module.exports = authenticateUser;
