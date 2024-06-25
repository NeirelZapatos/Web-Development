import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const blog = [];

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    console.log(`Connecting to port ${port}`);
    res.render(__dirname + "/views/index.ejs");
});

app.post("/submit", (req, res) => {
    console.log("Submitting new post");
    blog.push({
        title: req.body["title"],
        message: req.body["message"]
    });
    console.log(blog);
    res.render(__dirname + "/views/index.ejs", { posts : blog });
});

app.get("/update-page/:index", (req, res) => {
    res.render(__dirname + "/views/update-page.ejs", {
        posts: blog,
        postIndex: req.params.index
    });
});

app.post("/update", (req, res) => {

});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});