import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const apiKey = "Klvu2PIbshvixRzj0mu2o7vSyYSS3gYyy10cYWpS";
const URL = "https://api.nal.usda.gov/fdc/v1/foods/search"

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render(__dirname + "/views/index.ejs");
});

app.post("/food-summary", async (req, res) => {
    const food = req.body.query;
    const brand = req.body.brandOwner;

    try {
        const response = await axios.get(URL + `?api_key=${apiKey}&query=${food}&pageSize=1&pageNumber=1&brandOwner=${brand}`);
        const result = response.data;

        const nutrition = {
            foodName: result.food[0].description,
            brandName: result.food[0].brandOwner,
            servingSize: result.foods[0].servingSize,
            protein: result.foods[0].foodNutrients[0].value,
            fat: result.foods[0].foodNutrients[1].value,
            carbs: result.foods[0].foodNutrients[2].value,
            calories: result.foods[0].foodNutrients[3].value,
            sugar: result.foods[0].foodNutrients[4].value,
            fiber: result.foods[0].foodNutrients[5].value,
            calcium: result.foods[0].foodNutrients[6].value,
            iron: result.foods[0].foodNutrients[7].value,
            postassium: result.foods[0].foodNutrients[8].value,
            sodium: result.foods[0].foodNutrients[9].value,
            vitaminD: result.foods[0].foodNutrients[10].value,
            vitaminE: result.foods[0].foodNutrients[11].value,
            Niacin: result.foods[0].foodNutrients[12].value,
            cholesterol: result.foods[0].foodNutrients[13].value,
            transFat: result.foods[0].foodNutrients[14].value,
            saturatedFat: result.foods[0].foodNutrients[15].value
        }
        
        res.render(__dirname + "/views/index.ejs", {
            foodData: nutrition
        });
    } catch (error) {
        console.log(error.message);
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});