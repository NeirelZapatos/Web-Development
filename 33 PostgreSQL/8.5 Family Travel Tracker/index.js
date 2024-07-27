import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "family_world",
  password: "9kxtEC%M5%^2N92B",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

// let users = [
//   { id: 1, name: "Angela", color: "teal" },
//   { id: 2, name: "Jack", color: "powderblue" },
// ];

async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

async function checkUsers() {
  const result = await db.query("SELECT * FROM users");
  const userInfo = result.rows;
  return userInfo;
}

async function addUser(userName, userColor) {
  await db.query("INSERT INTO users (name, color) VALUES ($1, $2)",
    [userName, userColor]
  )
}

async function checkUserVisited(userID) {
  const result = await db.query("SELECT country_code FROM users JOIN visited_countries ON users.id = visited_countries.user_id WHERE users.id = $1;", 
    [userID]
  )
  let visited = result.rows;
  let visited_codes = [];

  for (let i = 0; i < visited.length; i++) {
    visited_codes.push(visited[i].country_code);
  }
  return visited_codes;
}

async function checkUser(userID) {
  const result = await db.query("SELECT * FROM users WHERE id = $1",
    [userID]
  )
  const userInfo = result.rows[0];

  return userInfo;
}

app.get("/", async (req, res) => {
  const countries = await checkUserVisited(currentUserId);
  const users = await checkUsers();
  const user = await checkUser(currentUserId);
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: user.color,
  });
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];  

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});
app.post("/user", async (req, res) => {
  if (req.body.add) {
    res.render("new.ejs");
  } else if (req.body.user) {
    const userID = req.body.user;
    currentUserId = userID;
    res.redirect("/");
  }
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
  const userName = req.body.name;
  const userColor = req.body.color;

  addUser(userName, userColor);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
