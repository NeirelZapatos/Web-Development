import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import pg from "pg";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import session from "express-session";
import env from "dotenv";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
env.config();

const db = new pg.Client({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});
db.connect();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

async function getBooks() {
    const result = await db.query("SELECT * FROM books");
    const books = result.rows;
    return books;
}

app.get("/", async (req, res) => {
    try {
        const bookInfo = await getBooks();
        console.log(bookInfo)
        if(bookInfo.length === 0) {
            res.send("No books found");
        } else {
            res.render(__dirname + "/views/index.ejs", {
                books: bookInfo,
            }); 
        }
    } catch (err) {
        console.log(err);
    }
    
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});