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
        const foodFacts = result.foods[0].foodNutrients
        var protein;
        var fat;
        var carbs;
        var calories;
        var sugar;
        var fiber;
        var sodium;
        var cholesterol;
        var transFat;
        var saturatedFat;

        for (var i = 0; i < result.foods[0].foodNutrients.length; i++){
            switch(foodFacts[i].nutrientId) {
                case 1003:
                    protein = foodFacts[i].value;
                    break;
                case 1004:
                    fat = foodFacts[i].value;
                    break;
                case 1005:
                    carbs = foodFacts[i].value;
                    break;
                case 1008:
                    calories = foodFacts[i].value;
                    console.log(foodFacts[i]);
                    break;
                case 2000:
                    sugar = foodFacts[i].value;
                    break;
                case 1079:
                    fiber = foodFacts[i].value;
                    break;
                case 1093:
                    sodium = foodFacts[i].value;
                    break;
                case 1253:
                    cholesterol = foodFacts[i].value;
                    break;
                case 1257:
                    transFat = foodFacts[i].value;
                    break;
                case 1258:
                    saturatedFat = foodFacts[i].value;
                    break;
                default:
                    console.log("Not important fact");
                    break;
            }
        }

        var servingSize = result.foods[0].servingSize;

        const nutrition = {
            foodName: result.foods[0].description,
            brandName: result.foods[0].brandOwner,
            servingSize: servingSize,
            protein: ((protein / 100) * servingSize).toFixed(1),
            fat: ((fat / 100) * servingSize).toFixed(1),
            carbs: ((carbs / 100) * servingSize).toFixed(1),
            calories: ((calories / 100) * servingSize).toFixed(1),
            sugar: ((sugar / 100) * servingSize).toFixed(1),
            fiber: ((fiber / 100) * servingSize).toFixed(1),
            sodium: ((sodium / 100) * servingSize).toFixed(1),
            cholesterol: ((cholesterol / 100) * servingSize).toFixed(1),
            transFat: ((transFat / 100) * servingSize).toFixed(1),
            saturatedFat: ((saturatedFat / 100) * servingSize).toFixed(1)
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