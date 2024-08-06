//Create a react app from scratch.
//It should display 2 paragraph HTML elements.
//The paragraphs should say:
//Created by YOURNAME.
//Copyright CURRENTYEAR.
//E.g.
//Created by Angela Yu.
//Copyright 2019.

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser

import React from 'react';
import ReactDOM from 'react-dom';

const date = new Date();

const name = "Neirel Zapatos";
const currentYear = date.getFullYear();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <p>Created by {name}</p>
        <p>Copyright {currentYear}</p>
    </React.StrictMode>
);