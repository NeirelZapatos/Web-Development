import React, { useState } from "react";

function CreateArea(props) {
  const [noteData, setNoteData] = useState({
    title: "",
    content: "",
  });

  function updateNote(event) {
    const { name, value } = event.target;

    setNoteData(prevValue => {
      return {
        ...prevValue,
        [name]: value
      }
    });
  }

  function submitNote(event) {
    props.addNote(noteData);
    setNoteData({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  return (
    <div>
      <form>
        <input name="title" placeholder="Title" value={noteData.title} onChange={updateNote}/>
        <textarea name="content" placeholder="Take a note..." rows="3" value={noteData.content} onChange={updateNote}/>
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
