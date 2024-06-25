import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const blog = {
    titles: [],
    messages: []
};

const app = express();
const port = 3000;

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    console.log(`Connecting to port ${port}`);
    res.render(__dirname + "/views/index.ejs");
});

app.post("/submit", (req, res) => {
    console.log("Submitting new post");
    blog["titles"].push(req.body["title"]);
    blog["messages"].push(req.body["message"]);
    console.log(blog);
    res.render(__dirname + "/views/index.ejs", blog);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});