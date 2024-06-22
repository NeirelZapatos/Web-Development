const fs = require("fs");

fs.writeFile("message.txt", "Hello fron NODEJS!", (err) => {
    if (err) throw err;
    console.log("The file has been saced");
});

fs.readFile('./message.txt', "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
  }); 