import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const endpoint = "https://api.linkpreview.net";
const config = {
    headers: {'X-Linkpreview-Api-Key': '7dbf8f08869709103707775bcae24b7c'}    
};

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render(__dirname + "/views/index.ejs");
});

app.post("/summary", async (req, res) => {
    console.log(req.body.url);

    try {
        const response = await axios.get(`${endpoint}/?q=${req.body.url}`, config);
        const result = response.data;
        res.render(__dirname + "/views/index.ejs", {
            summary: result
        });
    } catch (error) {
        console.log(error.response.data);
        res.render(__dirname + "/views/index.ejs", {
            errorMessage: "Website is unable to be summarized. Please try another website."
        });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});