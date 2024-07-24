import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world", 
  password: "9kxtEC%M5%^2N92B",
  port: 5432
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function checkVisited() {
  const result = await db.query("SELECT * FROM visited_countries");
  let visited = result.rows;
  let visited_codes = [];
  // console.log(result.rows);
  
  for (let i = 0; i < visited.length; i++) {
    visited_codes.push(visited[i].country_code);
  }
  console.log(visited_codes);
  return visited_codes;
}

app.get("/", async (req, res) => {
  //Write your code here.
  let visited_codes = await checkVisited();
  res.render("index.ejs", { 
    countries: visited_codes,
    total: visited_codes.length
  });
  // db.end();
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try{
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );
    
    try {
      let countryInfo = result.rows[0];
      await db.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1)",
        [countryInfo["country_code"]]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err)
      let visited_codes = await checkVisited();
      res.render("index.ejs", { 
        countries: visited_codes,
        total: visited_codes.length,
        error: "Country has already been added"
      });
    }
  } catch (err) {
    console.log(err);
    const visited_codes = await checkVisited();
    res.render("index.ejs", { 
      countries: visited_codes,
      total: visited_codes.length,
      error: "Country does not exist"
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
