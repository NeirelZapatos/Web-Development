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
    
    // Process the result to group comments by book
    const books = {};
    result.rows.forEach(row => {
        const { id, title, author, summary, notes, rating, isbn, comment, username } = row;
        if (!books[id]) {
            books[id] = {
                id, title, author, summary, notes, rating, isbn,
                comments: []
            };
        }
        if (comment) {
            books[id].comments.push({comment, username});
        }
    });

    return Object.values(books);
}

async function getOneBook(id) {
    const result = await db.query("SELECT * FROM books WHERE id = $1;",
        [id]
    );
    const book = result.rows;

    if(book.length !== 0) {
        return book[0];
    }

    console.log("No book found");
    return null;
}

app.get("/", async (req, res) => {
    try {
        const bookInfo = await getBooks();

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

app.get("/notes/:id", async (req, res) => {
    try {
        console.log(req.params.id);
        const bookInfo = await getOneBook(req.params.id);

        if (bookInfo === null) {
            res.send("Book of id was not found");
        } else {
            res.render(__dirname + "/views/notes.ejs", {
                book: bookInfo
            });
        }
    } catch (err) {
        console.log(err);
    }   
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});