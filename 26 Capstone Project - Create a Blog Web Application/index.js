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

// home page
app.get("/", (req, res) => {
    console.log(`Connecting to port ${port}`);
    res.render(__dirname + "/views/index.ejs", {
        posts: blog
    });
});

// creating new posts
app.post("/submit", (req, res) => {
    console.log("Submitting new post");
    blog.push({
        title: req.body["title"],
        message: req.body["message"]
    });
    console.log(blog);
    res.redirect("/");
});

// page to update posts
app.get("/update-page/:index", (req, res) => {
    res.render(__dirname + "/views/update-page.ejs", {
        posts: blog,
        postIndex: req.params.index
    });
});

// page to view post
app.get("/view-page/:index", (req, res) => {
    res.render(__dirname + "/views/view-page.ejs", {
        posts: blog,
        postIndex: req.params.index
    });    
});

// updates posts
app.post("/update/:index", (req, res) => {
    blog[req.params.index]["title"] = req.body["newTitle"];
    blog[req.params.index]["message"] = req.body["newMessage"];
    res.redirect("/");
});

// deletes a post
app.get("/delete/:index", (req, res) => {
    blog.splice(req.params.index);
    console.log(blog);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});