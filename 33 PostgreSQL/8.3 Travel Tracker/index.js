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

app.get("/", async (req, res) => {
  //Write your code here.
  const result = await db.query("SELECT * FROM visted_countries");
  let visited = result.rows;
  let total_visited = visited.length;
  let visited_codes = [];
  console.log(result.rows);
  
  for (let i = 0; i < visited.length; i++) {
    visited_codes.push(visited[i].country_code);
  }
  res.render("index.ejs", { 
    countries: visited_codes,
    total: total_visited
  });
  db.end();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
