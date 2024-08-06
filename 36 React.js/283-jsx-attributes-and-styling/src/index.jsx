import React from "react";
import ReactDOM from "react-dom/client";

const img = "https://picsum.photos/200"
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div>
      <h1 className="heading" contentEditable="true" spellCheck="false">My Favourite Foods</h1>
      <img src="https://jiminys.com/cdn/shop/articles/Depositphotos_87766636_S_68bc9d9a-1ef3-4234-bb73-9cae6bb8329c.jpg?v=1673977811" alt="corgi running"/>
      <img src="https://www.mydogsname.com/wp-content/uploads/2022/09/Pembroke-Welsh-Corgi-breed.jpg" alt="corgi standing"/>
      <img src="https://storage.googleapis.com/pod_public/1300/177546.jpg" alt="corgi drawing"/>
      <img src={img + "?grayscale"} alt="random image"/>
    </div>
  </React.StrictMode>
);

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
