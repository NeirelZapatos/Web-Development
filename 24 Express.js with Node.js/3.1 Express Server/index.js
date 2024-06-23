import express from "express";
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send("Hello, world!");
});

//3000 is the port number
app.listen(port, () => {
    // this is the callback after server is initialized.
    console.log(`Server running on port ${port}.`);
});