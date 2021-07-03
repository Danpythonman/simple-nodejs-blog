const fs = require("fs");
const { MongoClient } = require("mongodb");
const blogPostSchema = require("../models/blog-post");

const URI = JSON.parse(fs.readFileSync("./database-user.json"))["uri"];
const dataBaseName = JSON.parse(fs.readFileSync("./database-user.json"))["database-name"];
const collectionName = JSON.parse(fs.readFileSync("./database-user.json"))["collection-name"];

/* * * * * * * * * * * * * * * Get all blog posts * * * * * * * * * * * * * * */

getBlogPosts = (req, res) => {
    const mongoClient = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoClient.connect((err, db) => {
        const collection = mongoClient.db(dataBaseName).collection(collectionName);

        collection.find({}).toArray((err, arrayResult) => {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.status(200).send(arrayResult);
            mongoClient.close();
        });
    });

}

/* * * * * * * * * * * * * * * Add new blog posts * * * * * * * * * * * * * * */

addNewBlogPost = (req, res) => {
    // Validate user input
    const validationResult = blogPostSchema.validate(req.body);
    if (validationResult.error) {
        res.status(400).send(validationResult.error.details[0].message);
        return;
    }

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

module.exports = { getBlogPosts, addNewBlogPost };
