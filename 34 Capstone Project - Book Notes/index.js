import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import axios from "axios";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import session from "express-session";
import env from "dotenv";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

let failedLogin = false;
const saltRounds = 10;
const app = express();
const port = 3000;
env.config();

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60
        }
    })
);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Pool({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

// const db = new pg.Pool({
//     connectionString: process.env.POSTGRES_URL,
// });

async function getBooks() {
    // Query to get books and their comments
    const result = await db.query(`
        SELECT books.*, comments.comment, users.username, comments.id AS comment_id
        FROM books
        LEFT JOIN comments ON books.id = comments.book_id
        LEFT JOIN users ON comments.user_id = users.id
    `);
    
    // Process the result to group comments by book
    const books = {};
    result.rows.forEach(row => {
        const { id, title, author, summary, notes, rating, isbn, comment, username, comment_id } = row;
        if (!books[id]) {
            books[id] = {
                id, title, author, summary, notes, rating, isbn,
                comments: []
            };
        }
        if (comment) {
            books[id].comments.push({comment, username, comment_id});
        }
    });
    return Object.values(books);
}

// async function getOneBook(id) {
//     const result = await db.query("SELECT * FROM books WHERE id = $1;",
//         [id]
//     );
//     const book = result.rows;

//     if(book.length !== 0) {
//         return book[0];
//     }

//     console.log("No book found");
//     return null;
// }

app.get("/", async (req, res) => {
    console.log("Current User: ");
    console.log(req.user);

    try {
        const bookInfo = await getBooks();
        
        if (req.isAuthenticated()){
            res.render(__dirname + "/views/index.ejs", {
                books: bookInfo,
                loggedIn: true,
                user: req.user
            }); 
        } else {
            res.render(__dirname + "/views/index.ejs", {
                books: bookInfo,
                loggedIn: false
            }); 
        }
    } catch (err) {
        console.log(err);
        res.redirect("/");
    }
});

app.get("/log-in", (req, res) => {
    if (failedLogin) {
        res.render(__dirname + "/views/log-in.ejs", {
            loggedIn: false,
            errorMessage: "Invalid username or password"
        }); 
    } else {
        res.render(__dirname + "/views/log-in.ejs", {
            loggedIn: false,
        });
    }
});

app.get("/sign-up", (req, res) => {
    res.render(__dirname + "/views/sign-up.ejs", {
        loggedIn: false
    });
});

app.get("/log-out", (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

app.get("/auth/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
        prompt: "select_account"
    })
);

app.get("/auth/google/success", 
    passport.authenticate("google", {
        successRedirect: "/",
        failureRedirect: "/log-in"
    })
);

app.get("/update-book/:id", async (req, res) => {
    if (req.isAuthenticated && req.user.id === 1) {
        const bookID = req.params.id;

        try {
            const result = await db.query("SELECT * FROM books WHERE id = $1",
                [bookID]
            );
            const book = result.rows[0];

            res.render(__dirname + "/views/edit-book.ejs", {
                loggedIn: true,
                user: req.user,
                book: book
            });
        } catch (err) {
            console.log(err)
            res.redirect("/");
        }
    } else {
        res.redirect("/");
    }
});
    
    

app.get("/delete-book/:id", async (req, res) => {
    if (req.isAuthenticated() && req.user.id === 1) {
        const bookID = req.params.id;
        try {
            await db.query(`DELETE FROM comments WHERE $1=book_id`, 
                [bookID]
            );
            await db.query("DELETE FROM books WHERE id=$1",
                [bookID]
            );
        } catch (err) {
            console.log(err);
        }
    }
    res.redirect("/");
});

app.get("/delete-comment/:id", async (req, res) => {
    if (req.isAuthenticated()) {
        const commentID = req.params.id;
        console.log(commentID);
        try {
            await db.query(`DELETE FROM comments WHERE $1=comments.id`,
                [commentID]
            );
        } catch (err) {
            console.log(err);
        }
    }
    res.redirect("/");
});

app.post("/update-book/:id", async (req, res) => {
    if (req.isAuthenticated() && req.user.id === 1){
        const title = req.body.title;
        const author = req.body.author;
        const summary = req.body.summary;
        const review = req.body.review;
        const rating = req.body.rating;
        const isbn = req.body.isbn;
        const bookID = req.params.id;

        try {
            await db.query("UPDATE books SET title = $1, author = $2, summary = $3, notes = $4, rating = $5, isbn = $6 WHERE id = $7;",
                [title, author, summary, review, rating, isbn, bookID]
            );
        } catch (err) {
            console.log(err);
        }     
    } 
    res.redirect("/");
});
 
app.post("/add-book", async (req, res) => {
    if (req.isAuthenticated() && req.user.id === 1) {
        const isbn = req.body.isbn;

        try {
            const response = await axios.get(`http://openlibrary.org/api/volumes/brief/isbn/${isbn}.json`);
            const result = response.data.records;
            const path = Object.keys(result)[0];
            const book = result[path].data;

            res.render(__dirname + "/views/add-book.ejs", {
                loggedIn: true,
                user: req.user,
                book: book,
            });
        } catch (err) {
            console.log(err);
            res.redirect("/");
        }
    } else {
        res.redirect("/");
    }
});

app.post("/confirm-book", async (req, res) => {
    if (req.isAuthenticated() && req.user.id === 1) {
        const title = req.body.title;
        const author = req.body.author;
        const summary = req.body.summary;
        const review = req.body.review;
        const rating = req.body.rating;
        const isbn = req.body.isbn;

        try {
            await db.query("INSERT INTO books (title, author, summary, notes, rating, isbn) VALUES ($1, $2, $3, $4, $5, $6);",
                [title, author, summary, review, rating, isbn]
            );
        } catch (err) {
            console.log(err);
        }
    }
    res.redirect("/");
});

app.post("/add-comment/:id", async (req, res) => {
    if (req.isAuthenticated()) {
        const userComment = req.body.comment;
        const bookID = req.params.id;
        const userID = req.user.id;
        try {
            await db.query("INSERT INTO comments (user_id, comment, book_id) VALUES ($1, $2, $3);",
                [userID, userComment, bookID]
            );
            res.redirect("/");
        } catch (err) {
            console.log(err);
        } 
    } else {
        res.redirect("/log-in");
    }
});

app.post("/log-in",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/log-in"
    })
);

app.post("/register", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const checkResult = await db.query("SELECT * FROM users WHERE username = $1",
            [username]
        );
        if (checkResult.rows.length > 0) {
            res.send("Username unavailable");
        } else {
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                if (err) {
                    console.error("Error hashing password", err);
                } else {
                    const result = await db.query(
                        `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`,
                         [username, hash]
                    );
                    const user = result.rows[0];
                    req.login(user, (err) => {
                        console.log("Register Successful");
                        res.redirect("/");
                    });
                }
            });
        }
    } catch (err) {
        console.log(err);
    }
});

passport.use("local",
    new Strategy(async function verify(username, password, cb) {
        try {
            const result = await db.query("SELECT * FROM users WHERE username = $1",
                [username]
            );
            if (result.rows.length > 0) {
                const user = result.rows[0];
                const storedHashedPassword = user.password;
                bcrypt.compare(password, storedHashedPassword, (err, valid) => {
                    if (err) {
                        console.error("Error comparing passwords: ", err);
                        return cb(err);
                    } else {
                        if (valid) {
                            console.log("Log in successful");
                            failedLogin = false;
                            return cb(null, user);
                        } else {
                            failedLogin = true;
                            return cb(null, false);
                        }
                    }
                });
            } else {
                failedLogin = true;
                return cb(null, false);
            }
        } catch (err) {
            console.log(err);
        }
    })
);

passport.use("google",
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/google/success",
            userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
        },
        async (accessToken, refreshToken, profile, cb) => {
            try {
                // console.log(profile);
                // console.log(profile.given_name);
                const result = await db.query("SELECT * FROM users WHERE email = $1",
                    [profile.email]
                );
                if (result.rows.length === 0) {
                    const newUser = await db.query("INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING *",
                        [profile.email, profile.given_name, "google"]
                    );
                    return cb(null, newUser.rows[0]);
                } else {
                    return cb(null, result.rows[0]);
                }
            } catch (err) {
                return cb(err);
            }
        }
    )
);

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});