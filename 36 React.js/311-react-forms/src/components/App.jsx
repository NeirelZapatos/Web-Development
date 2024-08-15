import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [realName, setRealName] = useState("");

  function handleChange(event) {
    setName(event.target.value);
  }

  function handleClick(event) {
    setRealName(name);
    // this prevents the page from reloading after clicking submit button
    event.preventDefault();
  }

  return (
    <div className="container">
      <h1>Hello {realName}</h1>
      <form onSubmit={handleClick}>
        <input
          onChange={handleChange}
          type="text"
          placeholder="What's your name?"
          value={name}
        />
        <button type="submit">Submit</button>
      </form>

    </div>
  );

  // way without html form tag
  return (
    <div className="container">
      <h1>Hello {realName}</h1>
      <input
        onChange={handleChange}
        type="text"
        placeholder="What's your name?"
        value={name}
      />
      <button onClick={handleClick}>Submit</button>
    </div>
  );
}

export default App;
