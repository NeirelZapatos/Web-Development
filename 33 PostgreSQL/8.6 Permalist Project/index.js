import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "todo_list",
  password: "9kxtEC%M5%^2N92B",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// let items = [
//   { id: 1, title: "Buy milk" },
//   { id: 2, title: "Finish homework" },
// ];

async function getItems() {
  const result = await db.query("SELECT * FROM items;")
  let items = result.rows;
  return items;
}

async function getItem(itemID) {
  const result = await db.query("SELECT * FROM items WHERE id = $1",
    [itemID]
  );
  const itemInfo = result.rows[0];
}

app.get("/", async (req, res) => {
  try {
    const items = await getItems();
    res.render("index.ejs", {
      listTitle: "Today",
      listItems: items,
    });
  } catch (err) {
    console.log(err);
  }
  
});

app.post("/add", async (req, res) => {
  try {
    const item = req.body.newItem;
    await db.query("INSERT INTO items (name) VALUES ($1);",
      [item]
    );
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/edit", async (req, res) => {
  try {
    const itemID = req.body.updatedItemId;
    const itemName = req.body.updatedItemTitle;
    await db.query("UPDATE items SET name = $1 WHERE id = $2",
      [itemName, itemID]
    );
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/delete", async (req, res) => {
  try {
    const itemID = req.body.deleteItemId;
    await db.query("DELETE FROM items WHERE id = $1",
      [itemID]
    );
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
