import React from "react";
import ReactDOM from "react-dom/client";


const customStyle = {
    color: "red",
    fontSize: "20px",
    border: "1px solid black"
};

customStyle.color = "blue";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <h1 style={customStyle}>Hello World!</h1>
    </React.StrictMode> 
);

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
