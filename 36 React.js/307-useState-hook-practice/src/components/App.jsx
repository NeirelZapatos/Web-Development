import React from "react";

function App() {
  const [time, setTime] = React.useState(new Date().toLocaleTimeString([], {hour12: false}));

  function getTime() {
    setTime(new Date().toLocaleTimeString([], {hour12: false}));
  }

  setInterval(getTime, 1000);

  return (
    <div className="container">
      <h1>{time}</h1>
      <button onClick={getTime}>Get Time</button>
    </div>
  );
}

export default App;
