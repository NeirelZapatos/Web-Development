//Create a react app from scratch.
//It should display a h1 heading.
//It should display an unordered list (bullet points).
//It should contain 3 list elements.

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser

import React from "react";
import ReactDOM from "react-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <div>
            <h1>Breakfast</h1>
            <ul>
                <li>Eggs</li>
                <li>Bacon</li>
                <li>Milk</li>
            </ul>
        </div>  
    </React.StrictMode>  
);