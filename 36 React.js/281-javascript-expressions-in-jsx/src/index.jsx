import React from "react";
import ReactDOM from "react-dom";

const fName = "Neirel";
const lName = "Zapatos";
const num = 7;

// cant put statements like if or else statments. we can do expressions
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <h1>Hello {fName} {lName}!</h1>
        <p>Your lucky number is {num}</p>
        <p>Your lucky number is {Math.floor(Math.random() * 10)}</p>
    </React.StrictMode>  
);

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
