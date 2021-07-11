const router = require("express").Router();
const blogPostsController = require("../controllers/blog-posts");

router.get("/getBlogPosts", (req, res) => {
    res.status(200).send(
        [
            {
                "_id": "60d56cbafe32753cf8b06068",
                "title": "Manually Added Post Directly to Database",
                "body": "Ha, I added this post directly to the database instead of having some programming logic."
            },
            {
                "_id": "60d6221f180e1a208437ae7d",
                "title": "Manually Added Post Directly to Database",
                "body": "Ha, I added this post directly to the database instead of having some programming logic."
            },
            {
                "_id": "60d62235ea8542411ceef022",
                "title": "Manually Added Post Directly to Database",
                "body": "Ha, I added this post directly to the database instead of having some programming logic."
            },
            {
                "_id": "60e0e7bd7f12b80df03729cd",
                "title": "yeee",
                "body": "aaaa"
            },
            {
                "_id": "60e0e7e36045d02cc4281085",
                "title": "yeee",
                "body": "aaaa"
            },
            {
                "_id": "60e0e7f1924ac72ccce3fdfd",
                "title": "yeee",
                "body": "aaaa"
            },
            {
                "_id": "60e0e80e32b478318c5fc66f",
                "title": "yeee",
                "body": "aaaa"
            },
            {
                "_id": "60e0e82a57a0a22bc8874c3e",
                "title": "yeee",
                "body": "aaaa"
            },
            {
                "_id": "60e0e84813b1e929ac3825d3",
                "title": "yeee",
                "body": "aaaa"
            },
            {
                "_id": "60e0ee1e02eff033a0be1658",
                "title": "New Title",
                "body": "This POST request was sent with format x-www-form-urlencoded"
            },
            {
                "_id": "60e0eeb99894b53b08d4b19f",
                "title": "New Title",
                "body": "This POST request was sent with format x-www-form-urlencoded"
            },
            {
                "_id": "60e25d4df7e71f4d28019091",
                "title": "Realest Post",
                "body": "I added this post from the blog website"
            }
        ]
    );
});//blogPostsController.getBlogPosts);

router.post("/addNewBlogPost", blogPostsController.addNewBlogPost);

module.exports = router;
