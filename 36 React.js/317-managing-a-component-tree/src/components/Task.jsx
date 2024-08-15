import React, { useState } from 'react';

function Task(props) {
    const [isClicked, setIsClicked] = useState(false);

    function updateIsClicked() {
        setIsClicked((prevValue) => {
            return !prevValue;
        });
    }

    return (
        <div onClick={updateIsClicked}>
            <li style={{ textDecoration: isClicked ? "line-through" : "none" }}>{props.task}</li>
        </div>
    );
}

export default Task;