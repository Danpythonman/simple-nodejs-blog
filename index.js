const express = require("express");
const blogPostsRoutes = require("./routes/blog-posts");

// Start express
const app = express();

app.use(express.urlencoded({extended: false}));  // Put the body of requests req.body instead of URL
app.use(express.json());  // Read JSON data from POST requests
app.use(express.static("static"));  // Include static files in app
app.use("/api", blogPostsRoutes); // Routes for blog post endpoints

app.get("/", (req, res) => {
    res.sendFile("static/html/index.html", { root: __dirname });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log("Listening on PORT " + PORT + ".....");
});
