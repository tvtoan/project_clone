import React from "react";

const Story = ({story}) => {
    return (
        <div>
            <h3>User Id: {story.userId}</h3>
            <img src = {story.image} alt = "story" />
            <p> {story.text}</p>
        </div>
    );
}

export default Story;