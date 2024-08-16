import React, { useState, useRef, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";

function CreateArea(props) {
  const [inputClicked, setInputClicked] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  const formRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setInputClicked(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, []);


  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  function updateInputClicked() {
    setInputClicked(true);
  }

  return (
    <div>
      <form className="create-note" ref={formRef}>
        {inputClicked &&
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          /> 
        }
        
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={inputClicked ? 3 : 1}
          onClick={updateInputClicked}
        />

        <Zoom in={inputClicked}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
