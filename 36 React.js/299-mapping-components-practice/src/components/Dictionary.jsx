import React from 'react';
import Term from "./Term";
import emojipedia from "../emojipedia";

function createTerms(emoji) {
    return (
        <Term 
            key={emoji.id}
            emoji={emoji.emoji}
            name={emoji.name}
            meaning={emoji.meaning}
        />
    );
}

function Dictionary() {
    return (
        <div>
            <dl className="dictionary">
                {emojipedia.map(createTerms)}
            </dl>
        </div>
    );
}

export default Dictionary;