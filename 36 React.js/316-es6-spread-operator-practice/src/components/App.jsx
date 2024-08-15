import React, { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);

  function updateText(event) {
    const newText = event.target.value;
    setText(newText);
  }

  function updateTasks() {
    setTasks(prevItems => {
      return [...prevItems, text];
    });
    setText("");
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input onChange={updateText} type="text" value={text}/>
        <button onClick={updateTasks}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {tasks.map((task, index) => <li key={index}>{task}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default App;
