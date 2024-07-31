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
    // Query to get books and their comments
    const result = await db.query(`
        SELECT books.*, comments.comment, users.username
        FROM books
        LEFT JOIN comments ON books.id = comments.book_id
        LEFT JOIN users ON comments.user_id = users.id
    `);
    console.log(result.rows);
    
    // Process the result to group comments by book
    const books = {};
    result.rows.forEach(row => {
        const { id, title, author, summary, notes, rating, isbn, comment, username } = row;
        if (!books[id]) {
            books[id] = {
                title, author, summary, notes, rating, isbn,
                comments: []
            };
        }
        if (comment) {
            books[id].comments.push({comment, username});
        }
    });

    return Object.values(books);
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