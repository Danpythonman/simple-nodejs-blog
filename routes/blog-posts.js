const router = require("express").Router();
const blogPostsController = require("../controllers/blog-posts");

router.get("/getBlogPosts", blogPostsController.getBlogPosts);

router.post("/addNewBlogPost", blogPostsController.addNewBlogPost);

module.exports = router;
