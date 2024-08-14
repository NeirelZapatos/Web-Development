import React, { useState } from "react";

function App() {
  const [header, setHeader] = useState("Hello");
  const [color, setColor] = useState("white");

  function updateHeader() {
    setHeader("Submitted");
  }

  function hoverColor() {
    setColor("black");
  }

  function notHoverColor() {
    setColor("white");
  }

  return (
    <div className="container">
      <h1>{header}</h1>
      <input type="text" placeholder="What's your name?" />
      <button 
        style={{ backgroundColor: color }} 
        onClick={updateHeader} 
        onMouseOver={hoverColor} 
        onMouseOut={notHoverColor}
        >
          Submit
      </button>
    </div>
  );
}

export default App;
