import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import pg from "pg";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render(__dirname + "/views/index.ejs");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});