import React from "react";



function App(props) {
  const [time, getTime] = props;

  function getTime() {
    currTime = new Date().toLocaleTimeString();
  }

  return (
    <div className="container">
      <h1>{props.currentTime}</h1>
      <button>Get Time</button>
    </div>
  );
}

export default App;
