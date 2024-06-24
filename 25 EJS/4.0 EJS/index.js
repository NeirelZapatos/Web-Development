import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

const now = new Date();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    console.log(now.getDay());

    if (now.getDay() === 0 || now.getDay() === 6) {
        var message = "Hey! It's a weekday, it's time to work hard!";
    }
    else {
        var message = "Hey! It's the weekend, it's time to have fun!";
    }

    res.render(__dirname + "/views/index.ejs",
        {messageToShow: message}
    );
});

app.listen(port, () => {
    console.log(`listening on ${port}`);
});

// remember the command is "npm init -y"

