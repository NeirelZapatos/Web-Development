import express from "express";
import bodyParser from "body-parser";
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

const db = new pg.Client({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});
db.connect();

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
    console.log("Current user: " + req.user);
    try {
        const bookInfo = await getBooks();
        if(bookInfo.length === 0) {
            res.send("No books found");
        } else if (req.isAuthenticated()){
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

app.get("/notes/:id", async (req, res) => {
    try {
        const bookInfo = await getOneBook(req.params.id);
        if (bookInfo === null) {
            res.send("Book of id was not found");
        } else {
            res.render(__dirname + "/views/notes.ejs", {
                book: bookInfo,
                loggedIn: req.isAuthenticated(),
                // username: req.user.username
            });
        }
    } catch (err) {
        console.log(err);
        res.redirect("/");
    }   
});

app.get("/log-in", (req, res) => {
    res.render(__dirname + "/views/log-in.ejs", {
        loggedIn: false
    }); 
});

app.get("/sign-up", (req, res) => {
    res.render(__dirname + "/views/sign-up.ejs", {
        loggedIn: false
    });
});

app.get("/add-book", (req, res) => {
    res.render(__dirname + "/views/add-book.ejs");
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
 
app.post("/add-book", async (req, res) => {
    const title = req.body.title;
    const author = req.body.author;
    const summary = req.body.summary;
    const notes = req.body.notes;
    const rating = req.body.rating;
    const isbn = req.body.isbn;

    try {
        const result = await db.query(`SELECT * FROM books WHERE isbn = $1;`,
            [isbn]
        );
        if (result.rows != 0) {
            res.send("That book is already added");
        } else {
            await db.query(`INSERT INTO books (title, author, summary, notes, rating, isbn) VALUES ($1, $2, $3, $4, $5, $6);`,
                [title, author, summary, notes, rating, isbn]
            );
            res.redirect("/");
        }
    } catch (err) {
        console.log(err);
    }
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
                            return cb(null, user);
                            console.log(req.user.username);
                        } else {
                            return cb(null, false);
                        }
                    }
                });
            } else {
                return cb("User not found")
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