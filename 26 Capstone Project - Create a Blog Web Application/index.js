import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const blog = [
    {
        title: "Lorem Ipsum",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vestibulum, eros aliquam rhoncus sollicitudin, urna nisl rutrum justo, a rhoncus neque sapien at ligula. Ut magna orci, efficitur vitae porttitor eget, sagittis et risus. Phasellus vel dictum mi. Sed in fringilla magna. Nulla pulvinar malesuada metus porta auctor. Aliquam in sem aliquam, tempor massa eu, varius nisl. Ut feugiat lacinia est a semper. In tortor elit, cursus fermentum tincidunt vitae, facilisis in nulla. Nullam consectetur ex sit amet volutpat feugiat. Pellentesque non finibus tellus. Mauris luctus ipsum orci, eget luctus nisl dictum sed. Mauris vitae massa a augue ornare venenatis eu eu urna. Sed interdum, nunc vel lacinia suscipit, lorem libero consectetur quam, ac commodo nisi ante eget turpis. Proin ultricies augue sit amet tortor maximus aliquet. Duis ullamcorper, lorem eget luctus fermentum, tellus magna laoreet leo, non luctus urna orci et ligula.",
        date: "11-23-2015"
    }
];


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

    var date = new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    var today = mm + '/' + dd + '/' + yyyy;

    blog.push({
        title: req.body["title"],
        message: req.body["message"],
        date: today
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
    blog.splice(req.params.index, 1);
    console.log(blog);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});