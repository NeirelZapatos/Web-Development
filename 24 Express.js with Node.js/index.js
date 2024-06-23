import express from "express";
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    // gets the information of the request
    // console.log(req.rawHeaders);
    res.send("<h1>Hello, world!</h1>");
});

app.get('/contact', (req, res) => {
    res.send("Phone: 123-456-7890");
});

app.get('/about', (req, res) => {
    res.send("I really like Monster Hunter");
});

//3000 is the port number
app.listen(port, () => {
    // this is the callback after server is initialized.
    console.log(`Server running on port ${port}.`);
});