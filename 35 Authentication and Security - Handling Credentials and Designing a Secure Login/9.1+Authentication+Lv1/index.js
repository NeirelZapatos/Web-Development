import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "9kxtEC%M5%^2N92B",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1;",
      [username]
    );
  
    if (result.rows.length > 0) {
      res.send("Email is already registered");
    } else {
      await db.query("INSERT INTO users (email, password) VALUES ($1, $2);",
      [username, password]
      );
      res.render("secrets.ejs");
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const result = await db.query("SELECT password FROM users WHERE email = $1;",
      [username]
    )
  
    if (result.rows.length > 0) {
      const checkPassword = result.rows[0].password;
      if (checkPassword == password) {
        res.render("secrets.ejs");
      }
      res.send("incorrect password");
    } else {
      res.send("email does not exist");
    }
    
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
