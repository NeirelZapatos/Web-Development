import React from "react";
import ReactDOM from "react-dom/client";

function Card(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <img
        src={props.img}
        alt="avatar_img"
      />
      <p>{props.tel}</p>
      <p>{props.email}</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div>
      <h1>My Contacts</h1>
      <Card 
        name="Beyonce" 
        img="https://blackhistorywall.files.wordpress.com/2010/02/picture-device-independent-bitmap-119.jpg" 
        tel="+123 456 789" 
        email="b@beyonce.com"
      />
      <Card 
        name="Manny Pacman"
        img="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTCvP9vTHcvc8Hqteid1LIp_PhRHHAZ0RS89J-E321FPty_I6Ml"
        tel="+098-776-2341"
        email="themanny@gmail.com"
      />
      
    </div>
  </React.StrictMode>
);

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
