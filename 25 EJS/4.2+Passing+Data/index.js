import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log(`connecting to port ${port}`);
  res.render(__dirname + "/views/index.ejs");
});

app.post("/submit", (req, res) => {
  var fullName = req.body["fName"] + req.body["lName"];
  res.render(__dirname + "/views/index.ejs", {
    name: fullName
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
